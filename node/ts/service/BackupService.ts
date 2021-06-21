import * as fs from 'fs-extra';
import * as path from 'path';
import ProcesHelper from '../util/ProcesHelper';
import TimeUtil from '../util/TimeUtil';
import PlanDao from '../dao/PlanDao';
import History from '../entity/History';
import HistoryDao from '../dao/HistoryDao';
import moment from 'moment';

class BackupSum {
    fileNum: number = 0;
    fileSize: number = 0;
}


export default class BackupService {
    static timer: any = null;
    static isRun: boolean = false;

    static async start() {
        BackupService.timer = setInterval(BackupService.runOnce, 10 * 60 * 1000);
        await BackupService.runOnce();
    }

    static async runOnce() {
        if (BackupService.isRun) {
            return;
        }
        BackupService.isRun = true;
        try {
            await BackupService.run();
        } catch (err) {
            console.error("执行备份计划失败");
            console.error(err);
        } finally {
            BackupService.isRun = false;
        }
    }

    static async run() {
        let planList = await PlanDao.getNeedActionPlan();
        planList.forEach(item => item.ignoreList = JSON.parse(item.ignoreList as any));
        for (let index in planList) {
            let plan = planList[index];
            let history = new History();
            history.startTime = Date.now();
            history.planId = plan.planId;
            //判断源路径是否存在
            if (!(await fs.pathExists(plan.sourcePath))) {
                history.endTime = Date.now();
                history.comment = "源路径不存在，无法执行备份";
            } else {
                //目标存放在当前日期目录下
                let date = moment().format("YYYY-MM-DD");
                plan.targetPath = path.join(plan.targetPath, date);
                await BackupService.backup(history, plan.ignoreList, plan.sourcePath, plan.targetPath);
                history.endTime = Date.now();
                history.speed = history.fileNum > 0 ? Math.round(history.fileSize / ((history.endTime - history.startTime) / 1000) * 100) / 100 : 0;
                history.fileSize = Math.round(history.fileSize * 100) / 100;
                //进行gzip压缩
                await ProcesHelper.exec(`cd ${path.dirname(plan.targetPath)};mkdir ${date}-gzip;tar czf - ${date}|split -b 5000m - ${date}-gzip/data.tar.gz`);
                await fs.remove(plan.targetPath);

                //根据保留的历史份数来删除多余的历史
                let originPath = path.dirname(plan.targetPath);
                let fileList = await fs.readdir(originPath);
                fileList.sort((a, b) => b.localeCompare(a));
                for (let i = plan.holdHistory, length = fileList.length; i < length; i++) {
                    await fs.remove(path.join(originPath, fileList[i]));
                }
            }
            //插入一条备份记录
            let historyId = await HistoryDao.addOne(history);
            //更新此备份计划的下次执行时间和最近的一条更新记录
            await PlanDao.updateNextlaunchTimeAndLatestHistoryId(plan.planId, historyId);
        }
    }

    /**
     * 
     * @param sum 文件统计
     * @param sourcePath 源路径
     * @param targetPath 目标路径
     */
    static async backup(history: History, ignoreList: Array<String>, sourcePath: string, targetPath: string) {
        // 如果文件在忽略列表中，或者路径不存在跳过
        if (ignoreList.includes(path.basename(sourcePath)) || !(await fs.pathExists(sourcePath))) {
            return;
        }
        let stat = await fs.stat(sourcePath);
        if (stat.isDirectory()) {
            await fs.ensureDir(targetPath);
            let fileList = await fs.readdir(sourcePath);
            for (let i in fileList) {
                await BackupService.backup(history, ignoreList, path.join(sourcePath, fileList[i]), path.join(targetPath, fileList[i]));
            }
        } else {
            await fs.copyFile(sourcePath, targetPath);
            history.fileNum += 1;
            history.fileSize += stat.size / 1024 / 1024;
        }
    }
}


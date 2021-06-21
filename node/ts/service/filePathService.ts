import config from '../config';
import * as path from 'path';
import * as fs from 'fs-extra';

import ProcessHelper from '../util/ProcesHelper';

class filePathService {

    static async getPath(pathStr: string) {
        let res = new Array();
        if (pathStr.trim().length == 0) {
            //获取根目录路径
            if (config.isWindows) {
                //windows下
                let std: string = (await ProcessHelper.exec("wmic logicaldisk get caption") as Object)['stdout'].replace("Caption", "");
                res = std.split("\r\n").filter(item => item.trim().length > 0).map(item => item.trim());
            } else {
                //linux下
                pathStr = "/";
                res = await fs.readdir(pathStr);
            }
        } else {
            res = await fs.readdir(pathStr);
        }
        let folderList = new Array();
        for (let index in res) {
            try {
                let stat = await fs.stat(path.join(pathStr, res[index]));
                if (stat.isDirectory()) {
                    folderList.push(res[index]);
                }
            } catch (e) {
                console.error(e);
            }
        }
        return folderList;
    }

    static async createPath(pathStr: string) {
        await fs.ensureDir(pathStr);
    }

}


export default filePathService;

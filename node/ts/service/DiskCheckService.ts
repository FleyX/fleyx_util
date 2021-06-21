import DiskInfo from '../entity/DiskInfo';
import { on } from 'process';
import config from '../config';
import ProcessHelper from '../util/ProcesHelper';

class DiskCheckService {
    static asyncRun() {

    }

    static async checkDetail(): Promise<Array<DiskInfo>> {
        let res = [];
        for (let i = 0; i < config.disKCheckList.length; i++) {
            let item = config.disKCheckList[i];
            let one = new DiskInfo();
            one.name = item;
            let statusStr = await ProcessHelper.exec(`smartctl -H ${item}`);
            one.isOk = statusStr.indexOf("PASSED") > -1;
            one.detail = await ProcessHelper.exec(`smartctl -a ${item}`);
            res.push(one);
        }
        return res;
    }
}

export default DiskCheckService;
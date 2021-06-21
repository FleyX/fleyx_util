import { Context } from "koa";
import DiskCheckService from '../service/DiskCheckService';

const router = {};

router["GET /disk/info"] = async function (ctx: Context) {
    ctx.body = await DiskCheckService.checkDetail();
};


export default router;

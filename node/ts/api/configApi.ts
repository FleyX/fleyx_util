import { Context } from "koa";
import filePathService from '../service/filePathService';
import config from '../config';

const router = {};

/**
获取是否为windows平台
 */
router["GET /config/isWindows"] = async function (ctx: Context) {
    ctx.body = config.isWindows;
};

export default router;

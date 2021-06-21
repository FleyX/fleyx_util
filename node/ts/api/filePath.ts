import { Context } from "koa";
import filePathService from '../service/filePathService';

const router = {};

router["GET /path"] = async function (ctx: Context) {
    ctx.body = await filePathService.getPath(ctx.query.path);
};

/**
创建一个目录
 */
router["PUT /path"] = async function (ctx: Context) {
    await filePathService.createPath(ctx.query.path);
    ctx.body = "";
}

export default router;

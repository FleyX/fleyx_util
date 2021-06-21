import { Context } from "koa";
import planService from '../service/planService';

const router = {};

router["GET /plan"] = async function (ctx: Context) {
    ctx.body = await planService.getAll();
}

router["PUT /plan"] = async function (ctx: Context) {
    let res = await planService.addOne(ctx.request.body);
    ctx.body = res;
};

router["DELETE /plan/:planId"] = async function (ctx: Context) {
    await planService.deleteOne(ctx.params.planId);
    ctx.body = "";
}

export default router;

import { Context } from "koa";
import historyService from '../service/HistoryService';

const router = {};

router["GET /plan/:planId/history"] = async function (ctx: Context) {
    ctx.body = await historyService.getByPlanId(ctx.params.planId);
}

export default router;

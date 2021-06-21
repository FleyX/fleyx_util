import config from '../config';
import Plan from '../entity/Plan';
import PlanDao from '../dao/PlanDao';
import HistoryDao from '../dao/HistoryDao';

class PlanService {
    /**
     * 增加一个备份计划
     * @param plan plan
     */
    static async addOne(plan: Plan) {
        plan.latestHistoryId = 0;
        plan.lanuchInterval = plan.lanuchInterval * 24 * 60 * 60 * 1000;
        let id = await PlanDao.addOne(plan);
        plan.planId = id;
        return plan;
    }

    /**
     * 删除一个备份计划
     * @param planId planId
     */
    static async deleteOne(planId: number) {
        await PlanDao.deleteByPlanId(planId);
        await HistoryDao.deleteByPlanId(planId);
    }

    static async getAll() {
        let res = await PlanDao.getAll();
        res.forEach(item => item.ignoreList = JSON.parse(item.ignoreList as any));
        return res;
    }
}

export default PlanService;
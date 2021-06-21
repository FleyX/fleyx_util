import HistoryDao from '../dao/HistoryDao';

class HistoryService{
    static async getByPlanId(planId:number) {
        return await HistoryDao.getByPlanId(planId);
    }
}

export default HistoryService;
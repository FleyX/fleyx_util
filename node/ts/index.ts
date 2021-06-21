import koa from "koa";
import Router from "koa-router";
import koaBody from "koa-body";
import * as path from "path";
import RouterMW from "./middleware/controllerEngine";

import config from "./config";
import handleError from "./middleware/handleError";
import init from "./middleware/init";
import { MysqlUtil } from './util/MysqlHelper';
import BackupService from './service/BackupService';
import log from './util/LogUtil';


console.log(config);
const app = new koa();

let router = new Router({
  prefix: config.urlPrefix
});

app.use(require('koa-static')(path.join(config.rootPath, 'static')));

//表单解析
app.use(koaBody(config.bodyLimit));
//请求预处理
app.use(init);
//错误处理
app.use(handleError);

app.use(RouterMW(router, path.join(config.rootPath, "dist/api")));
(async () => {
  await MysqlUtil.createPool(config.mysqlConfig);
  // 开始备份计划
  BackupService.start();
  app.listen(config.port);
  log.info(`server listened `, config.port);
})();


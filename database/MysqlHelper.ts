import * as mysql from 'mysql';

/**
 * 使用前需要使用createPool进行初始化操作
 */
class MysqlHelper {
  private static pool: mysql.Pool = null;

  static createPool(option: mysql.ConnectionConfig) {
    if (MysqlHelper.pool == null) {
      MysqlHelper.pool = mysql.createPool(option);
      MysqlHelper.pool.query("select 1=1");
    }
  }

  static getConnection(): Promise<mysql.PoolConnection> {
    return new Promise((resolve, reject) => {
      MysqlHelper.pool.getConnection((error, conn) => {
        if (error) {
          if (error.code == 'ECONNREFUSED') {
            throw error;
            return;
          } else {
            reject(error);
            return;
          }
        }
        resolve(conn);
      });
    });
  }

  //返回多条记录
  static async row(
    sql: string,
    ...params: Array<object>
  ): Promise<Array<object>> {
    params = dealParams(params);
    let connection = await MysqlHelper.getConnection();
    return new Promise(function(resolve, reject) {
      connection.query(sql, params, function(error, res) {
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(res);
      });
    });
  }

  //返回一条记录
  static async first(
    sql: string,
    ...params: Array<object>
  ): Promise<object | null> {
    params = dealParams(params);
    let connection = await MysqlHelper.getConnection();
    return new Promise(function(resolve, reject) {
      connection.query(sql, params, function(error, res) {
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(res[0] || null);
      });
    });
  }

  //返回单个数据
  static async single(sql: string, ...params: Array<object>): Promise<any> {
    params = dealParams(params);
    let connection = await MysqlHelper.getConnection();
    return new Promise(function(resolve, reject) {
      connection.query(sql, params, function(error, res) {
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        for (let i in res[0]) {
          resolve(res[0][i]);
          return;
        }
        resolve(null);
      });
    });
  }

  //执行sql返回原生对象
  static async execute(sql: string, ...params: Array<object>): Promise<any> {
    params = dealParams(params);
    let connection = await MysqlHelper.getConnection();
    return new Promise(function(resolve, reject) {
      connection.query(sql, params, function(error, res) {
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(res);
      });
    });
  }
}

function dealParams(params: Array<any>) {
  if (params.length == 1 && typeof (params[0] == 'object')) {
    return params[0];
  } else {
    return params;
  }
}

export default MysqlHelper;

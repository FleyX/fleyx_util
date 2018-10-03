//未制作完毕


const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'sscm@163.com',
    server: '192.168.2.5',
    database: 'eifaf_jrjg',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
}

var connection = new sql.ConnectionPool(config , (err)=>{
    if(err){
        throw new Error(err);
    }
});

let get

var row = (sql1) => {
    return new Promise(function (resolve, reject) {
        let connection = new sql.ConnectionPool(config, function (err) {
            if (err)
                reject(err);
            connection.request().query(sql1, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result.recordset);
            });
        })
    });
}

var execute = (sql1) => {
    return new Promise(function (resolve, reject) {
        let connection = new sql.ConnectionPool(config, function (err) {
            if (err)
                reject(err);
            connection.request().query(sql1, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })
    });
}


module.exports = {
    ROW: row,
    EXECUTE: execute
}
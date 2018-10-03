'use strict'

const mongodb = require('mongodb').MongoClient;

const connectUrl = `mongodb://blogs:blogstest@tapme.top/blogs`;
const config = {
    poolSize: 10,
    sslValidate: false
}
var connections = null;

var initDB = () => {
    mongodb.connect(connectUrl, config, (err, db) => {
        if (err) {
            throw new Error(err);
            return;
        }
        connections = db;
    })
}
var getConnection = () => {
    return new Promise((resovle, reject) => {
        if (connections == null) {
            let timer1 = setInterval(() => {
                if (connections != null) {
                    clearInterval(timer1);
                    resovle(connections);
                }
            }, 100);
        }
    })
}

class MongodbHelper {
    static async test(documentName, objs) {
        let connections = await getConnection();
        let collection = connections.collection(documentName);
        return new Promise((resolve, reject) => {
            collection.insertMany(objs, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            })
        })
    }
}
initDB();
module.exports = MongodbHelper;

let test = async()=>{
    await MongodbHelper.test('sfs',[{
        a : 1,
        b : 2
    }]);
}

test();
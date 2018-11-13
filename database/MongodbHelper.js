const MongoClient = require("mongodb").MongoClient;
const Server = require("mongodb").Server;
const config = require('../config/config.js');

const client = new MongoClient(config.mongodb.url, config.mongodb.option);

client.close();
let init = async () => {
    if (!client.isConnected()) {
        await client.connect();
        db = client.db(config.mongodb.database);
    }
}

/**
 * 插入文档
 * @param {String} document 
 * @param  {...any} data 
 */
let insert = async (document, ...data) => {
    await init();
    let r;
    if (data.length = 1) {
        r = await db.collection(document).insertOne(data[0]);
    } else {
        r = await db.collection(document).insertMany(data);
    }
    return r;
}

/**
 * 更新一个文档
 * @param {String} document 
 * @param {Object} source 
 * @param {Object} target 
 * @param {Boolean} isUpsert 
 */
let updateOne = async (document, source, target, isUpsert = false) => {
    await init();
    let r = await db.collection(document).updateOne(source, {
        $set: target
    }, {
        upsert
    });
    if (isUpsert) {
        return r.upsertedCount;
    } else {
        return r.modifiedCount;
    }
}

/**
 * 更新多个文档
 * @param {String} document 
 * @param {Object} source 
 * @param {Object} target 
 * @param {Boolean} isUpsert 
 */
let updateMany = async (document, source, target, isUpsert = false) => {
    await init();
    let r = await db.collection(document).updateMany(source, {
        $set: target
    }, {
        upsert
    });
    if (isUpsert) {
        return r.upsertedCount;
    } else {
        return r.modifiedCount;
    }
}

let selectOne = async (document, condition,option={}) => {
    await init();
    let r = await db.collection(document).findOne(condition,option);
    return r;
}

let selectMany = async (document, condition,option={}) => {
    await init();
    let r = (await db.collection(document).find(condition,option)).toArray();
    return r;
}

let deleteOne = async (document, condition) => {
    await init();
    let r = await db.deleteOne(condition);
    return r.deleteCount;

}
let deleteMany = async (document, condition) => {
    await init();
    let r = await db.deleteMany(condition);
    return r.deleteCount;
}

selectOne("blogs", {});

module.exports = {
    client,
    insert,
    updateOne,
    updateMany,
    selectOne,
    selectMany,
    deleteOne,
    deleteMany
};
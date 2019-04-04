const redis = require('redis');
const config = require('../config/config.js');

let client = redis.createClient(config.redis.port, config.redis.host);
client.on('error', err => {
    throw err;
})
client.on('ready', () => {
    console.log('redis 初始化');
})

class RedisHelper {

    static getClient() {
        return client;
    }

    static setString(key, value) {
        return new Promise((resolve, reject) => {
            client.set(key, value, (err, reply) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(reply);
            });
        })
    }

    static getString(key) {
        return new Promise((resolve, reject) => {
            client.get(key, (err, reply) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(reply);
            });
        })
    }

    static async setObject(key, obj) {
        if (typeof (obj) != 'object') {
            reject('obj 不是一个对象');
            return;
        }
        let keys = Object.keys(obj);
        let temp = null;
        for (let i = 0; i < keys.length; i++) {
            temp = obj[keys[i]];
            if (typeof (temp) == 'object') {
                temp = JSON.stringify(temp);
            }
            await RedisHelper.setObjectItem(key, keys[i], temp);
        }
        return 'OK';
    }

    static getObject(key) {
        return new Promise((resolve, reject) => {
            client.hgetall(key, (err, reply) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(reply);
            })
        })
    }

    static setObjectItem(key, itemName, value) {
        return new Promise((resolve, reject) => {
            client.hmset(key, itemName, value, (err, reply) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(reply);
            })
        })
    }
    static setExpiration(key, time) {
        return new Promise((resolve, reject) => {
            client.expire(key, time, (err, reply) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(reply);
            })
        })
    }
}

module.exports = RedisHelper;
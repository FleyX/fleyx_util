let chars = [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
]

class StringHelper {
    /**
     * 获取随机字符串
     * @param {*0：字母数字混合 1：字母 2：数字} mode 
     * @param {*字符串长度} length 
     */
    static getRandomString(mode = 0, length = 6) {
        let temp = chars[mode];
        let max = temp.length - 1;
        let str = '';
        for (let i = 0; i < length; i++) {
            str += temp[StringHelper.getRandomNumber(max, 0)];
        }
        return str;
    }

    static getRandomNumber(max, min) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    }

    static isEmpty(str) {
        if (str == null) {
            return true;
        }
        str = str.replace(/ /g, '');
        if (str.length == 0) {
            return true;
        }
        return false;
    }
}

module.exports = StringHelper;
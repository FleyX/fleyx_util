const assert = require('assert');

const TextVerify = require('../text/TextVerify.js');

describe('#TextVerify.js', () => {
    describe('#isPassword(str)', () => {
        it(`isPassword() should return false`, () => {
            assert.strictEqual(TextVerify.isPassword(), false);
        });

        it(`isPassword('123456') should return true`, () => {
            assert.strictEqual(TextVerify.isPassword('123456'), true);
        });

        it(`isPassword('12312a_') should return true`, () => {
            assert.strictEqual(TextVerify.isPassword('12312a_'), true);
        });

        it(`isPassword('123456789012345678901') should return false`, () => {
            assert.strictEqual(TextVerify.isPassword('123456789012345678901'), false);
        });

        it(`isPassword('123456汉子') should return false`, () => {
            assert.strictEqual(TextVerify.isPassword('123456汉子'), false);
        });
    }),

    describe('#isEmail(str)', () => {
        it(`isEmail() should return false`, () => {
            assert.strictEqual(TextVerify.isEmail(), false);
        });

        it(`isEmail('123456') should return false`, () => {
            assert.strictEqual(TextVerify.isEmail('123456'), false);
        });

        it(`isEmail('1@ss.com') should return true`, () => {
            assert.strictEqual(TextVerify.isEmail('1@ss.com'), true);
        });

        it(`isEmail('fs12@test.edu.cn') should return true`, () => {
            assert.strictEqual(TextVerify.isEmail('fs12@test.edu.cn'), true);
        });

        it(`isEmail('fs@q.c.d') should return false`, () => {
            assert.strictEqual(TextVerify.isEmail('fs@q.c.d'), false);
        });
    }),

    describe('#isMobile(str)', () => {
        it(`isMobile() should return false`, () => {
            assert.strictEqual(TextVerify.isMobile(), false);
        });

        it(`isMobile('123456') should return false`, () => {
            assert.strictEqual(TextVerify.isMobile('123456'), false);
        });

        it(`isMobile('1234567890a') should return false`, () => {
            assert.strictEqual(TextVerify.isMobile('1234567890a'), false);
        });

        it(`isMobile('12345678901') should return true`, () => {
            assert.strictEqual(TextVerify.isMobile('12345678901'), true);
        });
    })
})
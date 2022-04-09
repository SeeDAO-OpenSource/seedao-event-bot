const crypto = require("crypto");

function strLen(str: string): number {
    let count = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        count += str.charCodeAt(i) < 256 ? 1 : 2;
    }
    return count;
}

function randomString(): string {
    return crypto.randomBytes(20).toString('hex');
}

export default {
    strLen,
    randomString,
}
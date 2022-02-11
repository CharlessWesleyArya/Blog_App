const { readFile, writeFile } = require('../helper/file.helper')
const path = require('path');
const PATH = path.join(__dirname, '..', 'data', 'user.data.json')
var findAll = function () {
    return readFile(PATH);
}
var findByUserName = async function (username) {
    var users = await readFile(PATH);
    if (users[username]) {
        return users[username];
    }
}
var checkUserName = async function (username) {
    var users = await readFile(PATH)
    if (users[username.toLowerCase()]) {
        return true;
    }
    return false;
}
var create = async function (user) {
    var users = await readFile(PATH)
    users[user.username] = user
    return writeFile(PATH, users)
}
module.exports = {
    findAll,
    findByUserName,
    checkUserName,
    create
}
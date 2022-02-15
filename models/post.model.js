const { readFile, writeFile } = require('../helper/file.helper')
const path = require('path');
const PATH = path.join(__dirname, '..', 'data', 'post.data.json')
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash')
exports.findAll = async function () {
    var postObj = await readFile(PATH)
    var posts = Object.keys(postObj).map(postKey => {
        return {
            ...postObj[postKey],
            id: postKey
        }
    })
    return posts;
}
exports.getAllPostsForUsers = async function (author) {
    var postObj = await readFile(PATH)
    var posts = Object.keys(postObj).map(postKey => {
        return {
            ...postObj[postKey],
            id: postKey
        }
    })
        .filter(post => post.author === author.toLowerCase())
    return posts;
}
exports.findById = async function (id) {
    var posts = await readFile(PATH);
    return { ...posts[id], id: id }
}
exports.create = async function (title, description, fileName, author) {
    var data = {
        title,
        description,
        author: author.toLowerCase(),
        imageUrl: `http://localhost:3000/uploads/${fileName}`,
        createdAt: new Date().toISOString()
    }
    var posts = await readFile(PATH);
    var id = uuidv4();
    posts[id] = data;
    await writeFile(PATH, posts)
}
exports.upadate = async function (id, title, description) {
    var posts = await readFile(PATH);
    posts[id] = { ...posts[id], title, description }
    await writeFile(PATH, posts)
}
exports.delete = async function (id) {
    var posts = await readFile(PATH)
    var newPosts = _.omit(posts, id)
    await writeFile(PATH, newPosts)
}
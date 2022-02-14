const { readFile, writeFile } = require('../helper/file.helper')
const path = require('path');
const PATH = path.join(__dirname, '..', 'data', 'post.data.json')
const { v4: uuidv4 } = require('uuid');
exports.getAllPosts = async function () {
    var postObj = await readFile(PATH)
    var posts = Object.keys(postObj).map(postKey => {
        return {
            ...postObj[postKey],
            id: postKey
        }
    })
    return posts;
}
exports.getAllPostsForUsers =async function (author) {
    var postObj = await readFile(PATH)
    var posts = Object.keys(postObj).map(postKey => {
        return {
            ...postObj[postKey],
            id: postKey
        }
    })
    .filter(post=>post.author===author.toLowerCase())
    return posts;
}

exports.createPost = async function (title, description, fileName, author) {
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
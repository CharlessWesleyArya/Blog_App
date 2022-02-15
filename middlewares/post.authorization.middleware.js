const PostModel = require('../models/post.model');
const { post } = require('../routes/post.route');
function postauthorization(req, res, next) {
    var { id } = req.params;
    var author = req.session.username;
    PostModel.findById(id)
        .then(post => {
            if (post && post.author === author.toLowerCase()) {
                return next();
            }
            return res.status(401).json({
                msg: 'unauthorized'
            })
        })
        .catch(err => {
            console.log(err)
        })
}
module.exports = postauthorization
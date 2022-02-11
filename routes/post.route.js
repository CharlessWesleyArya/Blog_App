var router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware')
router.use(authMiddleware)
router.get('/', (req, res) => {
    res.render('pages/post', {
        username: req.session ? req.session.username : null,
        posts: []
    })
})
router.post('/', (req, res) => {
    res.render('pages/posts')
})
router.get('/create', (req, res) => {
    res.render('pages/createPost', {
        username: req.session ? req.session.username : null
    })
})

module.exports = router;
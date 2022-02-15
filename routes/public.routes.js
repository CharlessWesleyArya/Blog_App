const router = require('express').Router()

const UserModel = require('../models/user.model')
const authMiddleware = require('../middlewares/auth.middleware')
const postModel = require('../models/post.model')
router.use(function (req, res, next) {
    var username = req.session && req.session.username;
    if (!username) {
        res.locals.username = '';
    }
    else {
        res.locals.username = username;
    }
    next();
})

router.get('/', /* authMiddleware, */(req, res) => {
    postModel.findAll()
        .then(data => {
            res.render('pages/home', {
                posts: data
            })
        })
})

router.get('/about', (req, res) => {
    res.render('pages/about')
})
router.get('/signup', (req, res) => {
    res.render('pages/signup')
})
router.get('/signin', (req, res) => {
    res.render('pages/signin')
})
router.post('/signin', async (req, res) => {
    var { username, password } = req.body
    var user = await UserModel.findByUserName(username.toLowerCase());
    if (user && user.password === password) {
        req.session.username = username;
        console.log("not coming")
        return res.redirect('/')
    }
})
router.post('/signup', async (req, res) => {
    const { username, name, mobile, password } = req.body;
    var isPresent = await UserModel.checkUserName(username);
    if (isPresent) {
        return;
    }
    await UserModel.create({ ...req.body, username: username.toLowerCase() })
    req.session.username = username;
    res.redirect('/')
})

router.get('/logout', async (req, res) => {
    req.session.destroy();
    return res.redirect('/signin')
})


module.exports = router;
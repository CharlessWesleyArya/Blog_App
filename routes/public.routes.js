const router = require('express').Router()

const UserModel = require('../models/user.model')
const authMiddleware=require('../middlewares/auth.middleware')

router.get('/',authMiddleware, (req, res) => {
    res.render('pages/home', {
        username: req.session ? req.session.username : null
    })
})

router.get('/about', (req, res) => {
    res.render('pages/about', {
        username: req.session ? req.session.username : null
    })
})
router.get('/signup', (req, res) => {
    res.render('pages/signup', {
        username: req.session ? req.session.username : null
    })
})
router.get('/signin', (req, res) => {
    res.render('pages/signin', {
        username: req.session ? req.session.username : null
    })
})
router.post('/signin', async (req, res) => {
    var { username, password } = req.body
    var user = await UserModel.findByUserName(username.toLowerCase());
    if (user && user.password === password) {
        req.session.username = username;
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
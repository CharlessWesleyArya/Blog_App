const router = require('express').Router()

const UserModel = require('../models/user.model')

router.get('/', (req, res) => {
    res.render('pages/home')
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
router.post('/signin', (req, res) => {
    req.session.username = req.body.username;
    res.redirect('/')
})
router.post('/signup', async (req, res) => {
    const { username, name, mobile, password } = req.body;
    var isPresent = await UserModel.checkUserName(username);
    if (isPresent) {

    }
    await UserModel.create({ ...req.body, username: username.toLowerCase() })
    req.session.username = username;
    res.redirect('/')
})




module.exports = router;
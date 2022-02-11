const router = require('express').Router()

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
router.post('/signup', (req, res) => {
    const { username, name, mobile, password } = req.body
})




module.exports = router;
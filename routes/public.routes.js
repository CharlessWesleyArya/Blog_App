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
    console.log(req.body);
})




module.exports = router;
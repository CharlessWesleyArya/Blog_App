const router = require('express').Router()
const { body, validationResult } = require('express-validator')
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
function navHelper() {
    return postModel.findAll()
        .then(data => data)

}
router.get('/', /* authMiddleware, */(req, res) => {
    navHelper()
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
    res.render('pages/signup', {
        username: null,
        name: null,
        password: null,
        mobile: null,
        error: null
    })
})
router.get('/signin', (req, res) => {
    res.render('pages/signin', {
        user: '',
        password: '',
        error: null
    })
})
router.post('/signin', [
    body('username').not().isEmpty().withMessage('please enter Username'),
    body('password').not().isEmpty().withMessage("please Enter Password")
], async (req, res) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) {
        var errorsString = errors.array().reduce(function (acc, val) {
            acc = acc + val.msg + ' ';
            return acc;
        }, '')
        res.render('pages/signin', {
            ...req.body,
            user: req.body.username,
            password: req.body.password,
            error: errorsString
        })
    }
    var { username, password } = req.body
    var user = await UserModel.findByUserName(username.toLowerCase());
    if (user && user.password === password) {
        req.session.username = username;
        res.locals.username = username;
        return navHelper()
            .then(data => {
                res.render('pages/home', {
                    posts: data
                })
            })
    }
    res.render('pages/signin', {
        user: username,
        password: password,
        error: 'Username and Password dont match'
    })
})
router.post('/signup', [
    body('username').not().isEmpty().withMessage('Username is Required')
        .bail()
        .custom(function (value) {
            return new Promise((resolve, reject) => {
                UserModel.checkUserName(value)
                    .then(isPresent => {
                        if (isPresent) {
                            return reject('Username is already Present')
                        }
                        resolve()
                    })
            })
        })
], async (req, res) => {
    const { username } = req.body;
    {/*non asynchronous type
    var isPresent = await UserModel.checkUserName(username);
    if (isPresent) {
        return res.render('pages/signup', {
            ...req.body,
            error: 'Username is Alreay Registered'
        })
    } */}
    var errors = validationResult(req)
    if (!errors.isEmpty()) {
        var errorsString = errors.array().reduce(function (acc, val) {
            acc = acc + val.msg + ' ';
            return acc;
        }, '')
        res.render('pages/signup', {
            ...req.body,
            user: req.body.username,
            password: req.body.password,
            error: errorsString
        })
    }
    await UserModel.create({ ...req.body, username: username.toLowerCase() })
    req.session.username = username;
    res.locals.username = username;
    navHelper()
        .then(data => {
            res.render('pages/home', {
                posts: data
            })
        })
})

router.get('/logout', async (req, res) => {
    req.session.destroy();
    return res.redirect('/signin')
})


module.exports = router;
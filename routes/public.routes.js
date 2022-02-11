const router = require('express').Router()

const UserModel = require('../models/user.model')

router.get('/', (req, res) => {
    res.render('pages/home',{
        username:req.session.username
    })
})

router.get('/about', (req, res) => {
    res.render('pages/about',{
        username:req.session.username
    })
})
router.get('/signup', (req, res) => {
    res.render('pages/signup',{
        username:req.session.username
    })
})
router.get('/signin', (req, res) => {
    res.render('pages/signin',{
        username:req.session.username
    })
})
router.post('/signin', async (req, res) => {
    var { username, password } = req.body
    var user = await UserModel.findByUserName(username.toLowerCase());
    if (user && user.password === password) {
        req.session.username=username;
        return res.redirect('/',{
            username:req.session.username
        })
    }
})
router.post('/signup', async (req, res) => {
    const { username, name, mobile, password } = req.body;
    var isPresent = await UserModel.checkUserName(username);
    if (isPresent) {
        return ;
    }
    await UserModel.create({ ...req.body, username: username.toLowerCase() })
    req.session.username = username;
    res.redirect('/',{
        username:req.session.username
    })
})

router.get('/logout',async (req,res)=>{
    req.session.destroy();
    return res.redirect('/signin')
})


module.exports = router;
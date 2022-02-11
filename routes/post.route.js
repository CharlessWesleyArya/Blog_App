var router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware')
router.use(authMiddleware)
router.get('/',(req, res) => {
    res.render('pages/post',{
        username:req.session?req.session.username:null,
        posts:[{
            "title":"this is title",
            "description":"this is description"
        }]
    })
})
router.post('/',(req,res)=>{
    res.render('pages/post')
})

module.exports = router;
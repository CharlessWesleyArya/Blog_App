var router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware')
router.get('/', authMiddleware, (req, res) => {
    res.render('pages/post')
})

module.exports = router;
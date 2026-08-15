const router = require('express').Router();


router.use('/auth',     require('./user/auth.route'));
router.use('/user',     require('./user/user.route'));


module.exports = router;

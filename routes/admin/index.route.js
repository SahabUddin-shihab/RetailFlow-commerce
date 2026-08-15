const Router = require('express').Router();


Router.use('/brand',      require('./brand.route'));
Router.use('/category',   require('./category.route'));


Router.use('/auth',      require('./auth.route'));


module.exports = Router;

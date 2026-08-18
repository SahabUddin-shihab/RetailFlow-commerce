const Router = require('express').Router();


Router.use('/city',       require('./city.route'));
Router.use('/brand',      require('./brand.route'));
Router.use('/category',   require('./category.route'));
Router.use('/subcategory',require('./subcategory.route'));

Router.use('/auth',      require('./auth.route'));
Router.use('/products',  require('./product.route'));
Router.use('/orders',    require('./order.route'));
Router.use('/coupons',   require('./coupon.route'));
Router.use('/banners',   require('./banner.route'));
Router.use('/returns',   require('./return.route'));

module.exports = Router;
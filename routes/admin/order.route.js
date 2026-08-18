const router = require('express').Router();
const AdminOrderController = require('../../controllers/admin/order.controller');
const { adminProtect } = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validate');
const { updateOrderStatusSchema, listOrdersSchema, getOrderSchema } = require('../../validations/order.validation');

router.use(adminProtect);

router.get('/dashboard', AdminOrderController.dashboard);
router.get('/',    validate(listOrdersSchema),        AdminOrderController.index);
router.get('/:id', validate(getOrderSchema),          AdminOrderController.show);
router.patch('/:id/status', validate(updateOrderStatusSchema), AdminOrderController.updateStatus);

module.exports = router;

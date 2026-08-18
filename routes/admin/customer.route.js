const router = require('express').Router();
const AdminCustomerController = require('../../controllers/admin/customer.controller');
const { adminProtect } = require('../../middleware/auth.middleware');
const { objectId } = require('../../validations/shared');
const validate = require('../../middleware/validate');
const { z } = require('zod');

router.use(adminProtect);

const idSchema = z.object({ params: z.object({ id: objectId }) });

router.get('/',AdminCustomerController.index);
router.get('/:id',validate(idSchema),AdminCustomerController.show);
router.patch('/:id/toggle-status', validate(idSchema),AdminCustomerController.toggleStatus);
router.get('/:id/orders',validate(idSchema),AdminCustomerController.orderHistory);

module.exports = router;

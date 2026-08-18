const router = require('express').Router();
const AdminReturnController = require('../../controllers/admin/return.controller');
const { adminProtect } = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validate');
const { z } = require('zod');
const { objectId } = require('../../validations/shared');

router.use(adminProtect);

const processSchema = z.object({
    params: z.object({ id: objectId }),
    body: z.object({
        status:       z.enum(['approved', 'rejected']),
        refundAmount: z.number().nonnegative().optional(),
        adminNote:    z.string().trim().max(500).optional(),
    }),
});

router.get('/', AdminReturnController.index);
router.patch('/:id/process', validate(processSchema), AdminReturnController.process);

module.exports = router;

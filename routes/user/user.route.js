const router = require('express').Router();
const UserController = require('../../controllers/user/user.controller');
const { protect } = require('../../middleware/auth.middleware');
const { uploadSingle, setUploadFolder } = require('../../middleware/upload.middleware');
const validate = require('../../middleware/validate');
const {
    updateProfileSchema,
    addAddressSchema,
    updateAddressSchema,
    deleteAddressSchema,
    wishlistToggleSchema,
} = require('../../validations/user.validation');

// All user routes are protected
router.use(protect);

// Profile
router.get('/profile',  UserController.getProfile);
router.put('/profile',  setUploadFolder('users'), uploadSingle('avatar'), validate(updateProfileSchema), UserController.updateProfile);

// Addresses
router.get('/addresses',               UserController.getAddresses);
router.post('/addresses',             validate(addAddressSchema),    UserController.addAddress);
router.put('/addresses/:addressId',   validate(updateAddressSchema), UserController.updateAddress);
router.delete('/addresses/:addressId',validate(deleteAddressSchema), UserController.deleteAddress);

// Wishlist
router.get('/wishlist',                              UserController.getWishlist);
router.post('/wishlist/:productId', validate(wishlistToggleSchema), UserController.toggleWishlist);

// Recently viewed
router.get('/recently-viewed', UserController.getRecentlyViewed);

module.exports = router;

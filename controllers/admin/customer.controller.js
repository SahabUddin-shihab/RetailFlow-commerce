const UserService = require('../../services/user.service');
const catchAsync = require('../../utils/catchAsync');
const ApiResponse = require('../../utils/ApiResponse');
const ApiError = require('../../utils/ApiError');

class AdminCustomerController {
    constructor() {
        this.userService = new UserService();
    }

    index = catchAsync(async (req, res) => {
        const { page = 1, limit = 20, search, isActive } = req.query;
        const filters = { search };
        if (isActive !== undefined) filters.isActive = isActive === 'true';
        const { users, total } = await this.userService.getAllUsers(filters, {
            limit: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit),
            sort: { createdAt: -1 },
        });
        return ApiResponse.paginated(res, users, page, limit, total, 'Customers fetched successfully');
    });

    show = catchAsync(async (req, res) => {
        const user = await this.userService.getProfile(req.params.id);
        return ApiResponse.success(res, user, 'Customer fetched successfully');
    });

    toggleStatus = catchAsync(async (req, res) => {
        const user = await this.userService.getById(req.params.id);
        if (!user) throw ApiError.notFound('Customer not found');
        const updated = await this.userService.update(req.params.id, { isActive: !user.isActive });
        const msg = updated.isActive ? 'Customer activated' : 'Customer deactivated';
        return ApiResponse.success(res, updated, msg);
    });

    orderHistory = catchAsync(async (req, res) => {
        const OrderService = require('../../services/order.service');
        const orderService = new OrderService();
        const { page = 1, limit = 10 } = req.query;
        const { orders, total } = await orderService.getUserOrders(req.params.id, { page, limit });
        return ApiResponse.paginated(res, orders, page, limit, total, 'Order history fetched');
    });
}

module.exports = new AdminCustomerController();

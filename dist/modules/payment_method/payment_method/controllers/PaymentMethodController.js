"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreatePaymentMethodService = _interopRequireDefault(require("../services/CreatePaymentMethodService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class PaymentMethodController {
  async create(request, response) {
    const {
      name
    } = request.body;
    const createPaymentMethod = new _CreatePaymentMethodService.default();
    const paymentMethod = await createPaymentMethod.execute(name);
    return response.json(paymentMethod);
  }

  // public async get(request: Request, response: Response): Promise<Response> {
  // 	const { user_code } = request.user;

  // 	const getUserAddress = new GetUserAddressService();
  // 	const userAddress = await getUserAddress.execute({ user_code });

  // 	return response.json(userAddress);
  // }
}
exports.default = PaymentMethodController;
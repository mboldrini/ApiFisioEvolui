"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreatePaymentMethodUserService = _interopRequireDefault(require("../services/CreatePaymentMethodUserService"));
var _DeletePaymentMethodUserService = _interopRequireDefault(require("../services/DeletePaymentMethodUserService"));
var _GetAllPaymentMethodUserService = _interopRequireDefault(require("../services/GetAllPaymentMethodUserService"));
var _GetPaymentMethodUserService = _interopRequireDefault(require("../services/GetPaymentMethodUserService"));
var _UpdatePaymentMethodUserService = _interopRequireDefault(require("../services/UpdatePaymentMethodUserService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class PaymentMethodUserController {
  async create(request, response) {
    const {
      name,
      description
    } = request.body;
    const {
      user_code
    } = request.user;
    const createPaymentMethodUser = new _CreatePaymentMethodUserService.default();
    const paymentMethod = await createPaymentMethodUser.execute({
      name,
      description,
      user_code
    });
    return response.json(paymentMethod);
  }
  async update(request, response) {
    const {
      name,
      description
    } = request.body;
    const {
      user_code
    } = request.user;
    const {
      id
    } = request.params;
    const client_id = parseInt(id);
    const updatePaymentMethodUser = new _UpdatePaymentMethodUserService.default();
    const paymentMethod = await updatePaymentMethodUser.execute({
      name,
      description,
      user_code,
      id: client_id
    });
    return response.json(paymentMethod);
  }
  async delete(request, response) {
    const {
      user_code
    } = request.user;
    const {
      id
    } = request.params;
    const paymentId = parseInt(id);
    const deletePaymentMethodUser = new _DeletePaymentMethodUserService.default();
    const paymentMethod = await deletePaymentMethodUser.execute({
      id: paymentId,
      user_code
    });
    return response.json(paymentMethod);
  }
  async get(request, response) {
    const {
      user_code
    } = request.user;
    const {
      id
    } = request.params;
    const paymentId = parseInt(id);
    const getPaymentMethodUser = new _GetPaymentMethodUserService.default();
    const paymentMethod = await getPaymentMethodUser.execute({
      id: paymentId,
      user_code
    });
    return response.json(paymentMethod);
  }
  async getAll(request, response) {
    const {
      user_code
    } = request.user;
    const getPaymentMethodUser = new _GetAllPaymentMethodUserService.default();
    const paymentMethod = await getPaymentMethodUser.execute({
      user_code
    });
    return response.json(paymentMethod);
  }
}
exports.default = PaymentMethodUserController;
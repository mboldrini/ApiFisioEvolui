"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CancelServicePaymentService = _interopRequireDefault(require("../services/CancelServicePaymentService"));
var _CreateServicePaymentService = _interopRequireDefault(require("../services/CreateServicePaymentService"));
var _DeleteServicePaymentService = _interopRequireDefault(require("../services/DeleteServicePaymentService"));
var _GetAllServicesPaymentService = _interopRequireDefault(require("../services/GetAllServicesPaymentService"));
var _GetServicePaymentService = _interopRequireDefault(require("../services/GetServicePaymentService"));
var _UpdateServicePaymentService = _interopRequireDefault(require("../services/UpdateServicePaymentService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ServicePaymentController {
  async create(request, response) {
    const {
      appointment_id,
      comments,
      status,
      scheduled,
      serviceType_id
    } = request.body;
    const {
      user_code
    } = request.user;
    const servicePayment = new _CreateServicePaymentService.default();
    const appointment = await servicePayment.create({
      user_code,
      appointment_id,
      comments,
      status,
      scheduled,
      serviceType_id
    });
    return response.json(appointment);
  }
  async update(request, response) {
    const {
      appointment_id,
      comments,
      status,
      scheduled,
      serviceType_id
    } = request.body;
    const {
      user_code
    } = request.user;
    const {
      id
    } = request.params;
    const payment_id = parseInt(id);
    const servicePayment = new _UpdateServicePaymentService.default();
    const appointment = await servicePayment.update({
      id: payment_id,
      user_code,
      appointment_id,
      comments,
      status,
      scheduled,
      serviceType_id
    });
    return response.json(appointment);
  }
  async get(request, response) {
    const {
      user_code
    } = request.user;
    const {
      id
    } = request.params;
    const payment_id = parseInt(id);
    const servicePayment = new _GetServicePaymentService.default();
    const appointment = await servicePayment.get({
      id: payment_id,
      user_code
    });
    return response.json(appointment);
  }
  async getAll(request, response) {
    const {
      user_code
    } = request.user;
    const servicePayment = new _GetAllServicesPaymentService.default();
    const appointment = await servicePayment.get({
      user_code
    });
    return response.json(appointment);
  }
  async delete(request, response) {
    const {
      user_code
    } = request.user;
    const {
      id
    } = request.params;
    const payment_id = parseInt(id);
    const servicePayment = new _DeleteServicePaymentService.default();
    const appointment = await servicePayment.delete({
      id: payment_id,
      user_code
    });
    return response.json(appointment);
  }
  async cancel(request, response) {
    const {
      scheduled
    } = request.body;
    const {
      user_code
    } = request.user;
    const {
      id
    } = request.params;
    const payment_id = parseInt(id);
    const servicePayment = new _CancelServicePaymentService.default();
    const appointment = await servicePayment.cancel({
      id: payment_id,
      user_code,
      scheduled
    });
    return response.json(appointment);
  }
}
exports.default = ServicePaymentController;
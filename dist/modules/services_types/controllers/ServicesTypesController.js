"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateServiceTypeService = _interopRequireDefault(require("../services/CreateServiceTypeService"));
var _DeleteServiceTypeService = _interopRequireDefault(require("../services/DeleteServiceTypeService"));
var _GetAllServicesTypeServices = _interopRequireDefault(require("../services/GetAllServicesTypeServices"));
var _GetServiceTypeServices = _interopRequireDefault(require("../services/GetServiceTypeServices"));
var _UpdateServiceTypeService = _interopRequireDefault(require("../services/UpdateServiceTypeService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ServicesTypesController {
  async create(request, response) {
    const {
      name,
      description,
      duration,
      price,
      paymentMethod_id
    } = request.body;
    const {
      user_code
    } = request.user;
    const createServicesTypes = new _CreateServiceTypeService.default();
    const services = await createServicesTypes.execute({
      user_code,
      name,
      description,
      duration,
      price,
      paymentMethod_id
    });
    return response.json({
      messsage: 'ok'
    });
  }
  async update(request, response) {
    const {
      name,
      description,
      duration,
      price,
      paymentMethod_id
    } = request.body;
    const {
      user_code
    } = request.user;
    const {
      id
    } = request.params;
    const serviceId = parseInt(id);
    const updateServicesTypes = new _UpdateServiceTypeService.default();
    const services = await updateServicesTypes.execute({
      id: serviceId,
      user_code,
      name,
      description,
      duration,
      price,
      paymentMethod_id
    });
    return response.json({
      messsage: 'ok'
    });
  }
  async get(request, response) {
    const {
      user_code
    } = request.user;
    const {
      id
    } = request.params;
    const serviceId = parseInt(id);
    const updateServicesTypes = new _GetServiceTypeServices.default();
    const services = await updateServicesTypes.execute({
      id: serviceId,
      user_code
    });
    return response.json(services);
  }
  async getAll(request, response) {
    const {
      user_code
    } = request.user;
    const deleteServicesTypes = new _GetAllServicesTypeServices.default();
    const services = await deleteServicesTypes.execute({
      user_code
    });
    return response.json(services);
  }
  async delete(request, response) {
    const {
      user_code
    } = request.user;
    const {
      id
    } = request.params;
    const serviceId = parseInt(id);
    const deleteServicesTypes = new _DeleteServiceTypeService.default();
    const services = await deleteServicesTypes.execute({
      id: serviceId,
      user_code
    });
    return response.json({
      message: 'ok'
    });
  }
}
exports.default = ServicesTypesController;
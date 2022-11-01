"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateUserAddressService = _interopRequireDefault(require("../services/CreateUserAddressService"));
var _GetUserAddressService = _interopRequireDefault(require("../services/GetUserAddressService"));
var _UpdateUserAddressService = _interopRequireDefault(require("../services/UpdateUserAddressService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UsersController {
  async create(request, response) {
    const {
      address,
      number,
      city,
      district,
      state,
      country
    } = request.body;
    const {
      user_code
    } = request.user;
    const createUserAddress = new _CreateUserAddressService.default();
    const userAddress = await createUserAddress.execute({
      user_code,
      address,
      number,
      city,
      district,
      state,
      country
    });
    return response.json({
      messsage: 'ok'
    });
  }
  async update(request, response) {
    const {
      address,
      number,
      city,
      district,
      state,
      country
    } = request.body;
    const {
      user_code
    } = request.user;
    const updateUserAddress = new _UpdateUserAddressService.default();
    const userAddress = await updateUserAddress.execute({
      user_code,
      address,
      number,
      city,
      district,
      state,
      country
    });
    return response.json(userAddress);
  }
  async get(request, response) {
    const {
      user_code
    } = request.user;
    const getUserAddress = new _GetUserAddressService.default();
    const userAddress = await getUserAddress.execute({
      user_code
    });
    return response.json(userAddress);
  }
}
exports.default = UsersController;
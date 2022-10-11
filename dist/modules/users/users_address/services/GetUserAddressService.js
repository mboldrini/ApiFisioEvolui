"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsersRepository = require("../../users/typeorm/repositories/UsersRepository");
var _DTO = require("../../../../shared/DTO");
var _UsersAddressRepository = require("../typeorm/repositories/UsersAddressRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetUsersAddressService {
  async execute({
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const usersAddressRepo = (0, _typeorm.getCustomRepository)(_UsersAddressRepository.UsersAddressRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default("User don't exist", 404);
    let userAddressExists = await usersAddressRepo.findOne({
      user_id: userExists.user_id
    });
    if (!userAddressExists) throw new _AppError.default("Don't exist an address for this user", 404);
    const address = {
      address: userAddressExists.address,
      number: userAddressExists.number,
      city: userAddressExists.city,
      district: userAddressExists.district,
      state: userAddressExists.state,
      country: userAddressExists.country,
      created_at: userAddressExists.created_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE),
      updated_at: userAddressExists.updated_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE)
    };
    return address;
  }
}
var _default = GetUsersAddressService;
exports.default = _default;
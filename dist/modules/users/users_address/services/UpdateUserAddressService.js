"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsersRepository = require("../../users/typeorm/repositories/UsersRepository");
var _UsersAddressRepository = require("../typeorm/repositories/UsersAddressRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdateUsersAddressService {
  async execute({
    user_code,
    address,
    number,
    city,
    district,
    state,
    country
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const usersAddressRepo = (0, _typeorm.getCustomRepository)(_UsersAddressRepository.UsersAddressRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default("User don't exist", 404);
    const userAddressExists = await usersAddressRepo.findOne({
      user_id: userExists.user_id
    });
    if (!userAddressExists) throw new _AppError.default("Don't exist an address for this user", 404);
    userAddressExists.address = address;
    userAddressExists.number = number;
    userAddressExists.city = city;
    userAddressExists.district = district;
    userAddressExists.state = state;
    userAddressExists.country = country;
    await usersAddressRepo.save(userAddressExists);
    return userAddressExists;
  }
}
var _default = UpdateUsersAddressService;
exports.default = _default;
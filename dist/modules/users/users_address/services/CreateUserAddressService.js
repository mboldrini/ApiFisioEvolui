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
class CreateUsersAddressService {
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
    if (!userExists.enabled) throw new _AppError.default('This User is deactivated', 404);
    const userAddressExists = await usersAddressRepo.findOne({
      user_id: userExists.user_id
    });
    if (userAddressExists) throw new _AppError.default('Already exist a address for this user', 404);
    const userAddress = usersAddressRepo.create({
      address,
      number,
      city,
      district,
      state,
      country,
      user_id: userExists.user_id
    });
    await usersAddressRepo.save(userAddress);
    return userAddress;
  }
}
var _default = CreateUsersAddressService;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsersRepository = require("../typeorm/repositories/UsersRepository");
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UserAlreadyExistService {
  async execute({
    user_code,
    email,
    magic_code
  }) /* the default was 'User' */{
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    if (magic_code != 'mufasa') throw new _AppError.default('Where is the magic!?', 500);
    const userExist = await usersRepository.findOne({
      user_code,
      email
    });
    if (userExist) {
      return {
        exists: true
      };
    } else {
      return {
        exists: false
      };
    }
  }
}
var _default = UserAlreadyExistService;
exports.default = _default;
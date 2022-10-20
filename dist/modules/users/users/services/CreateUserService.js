"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsersRepository = require("../typeorm/repositories/UsersRepository");
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateUserService {
  async execute({
    user_code,
    name,
    family_name,
    given_name,
    picture,
    email
  }) /* the default was 'User' */{
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const userIdExists = await usersRepository.findById(user_code);
    if (userIdExists) throw new _AppError.default('Já existe um usuario com o ID informado', 404);
    const userEmailExists = await usersRepository.findByEmail(email);
    if (userEmailExists) throw new _AppError.default('Já existe um usuário com o email informado', 404);
    const user = usersRepository.create({
      user_code: '112545285895674179379',
      name,
      family_name,
      given_name,
      picture,
      email,
      enabled: true
    });
    await usersRepository.save(user);
    return {
      message: 'ok'
    };
  }
}
var _default = CreateUserService;
exports.default = _default;
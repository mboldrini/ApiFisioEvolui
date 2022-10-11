"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("../../../../config/auth"));
var _typeorm = require("typeorm");
var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateSessionsService {
  async execute({
    email,
    user_code,
    magic_code
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new _AppError.default('Usuário não encontrado', 401);
    }
    if (user_code !== user.user_code) {
      throw new _AppError.default('Usuário inválido', 401);
    }
    const token = (0, _jsonwebtoken.sign)({
      user_code: user_code,
      email: email
    }, _auth.default.jwt.secret, {
      expiresIn: _auth.default.jwt.expiresIn
    });
    return {
      token
    };
  }
}
var _default = CreateSessionsService;
exports.default = _default;
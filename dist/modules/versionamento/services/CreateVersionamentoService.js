"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _VersionamentoRepository = require("./../typeorm/repositories/VersionamentoRepository");
var _UsersRepository = require("../../users/users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateVersionamentoService {
  async execute({
    versao,
    novidades,
    data_publicacao,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const versionamentoRepo = (0, _typeorm.getCustomRepository)(_VersionamentoRepository.VersionamentoRepository);
    const userExist = await usersRepo.findOne({
      user_code,
      email: 'equipeviciobr@gmail.com'
    });
    if (!userExist) throw new _AppError.default("User don't exist", 404);
    const versaoObj = versionamentoRepo.create({
      versao,
      novidades,
      data_publicacao,
      liberado: true
    });
    await versionamentoRepo.save(versaoObj);
    return versaoObj;
  }
}
var _default = CreateVersionamentoService;
exports.default = _default;
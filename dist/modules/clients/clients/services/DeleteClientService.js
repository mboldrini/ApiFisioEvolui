"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ClientsRepository = require("../typeorm/repositories/ClientsRepository");
var _UsersRepository = require("../../../users/users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DeleteClientService {
  async execute({
    id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default("User don't exist", 404);
    const clientExist = await clientRepo.findOne({
      id,
      user_id: userExists.user_id,
      enabled: true
    });
    if (!clientExist) throw new _AppError.default("This client don't exist ", 404);
    clientExist.enabled = false;
    await clientRepo.save(clientExist);
    return clientExist;
  }
}
var _default = DeleteClientService;
exports.default = _default;
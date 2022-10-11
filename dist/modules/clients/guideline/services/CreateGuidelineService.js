"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Guideline = require("./../typeorm/repositories/Guideline");
var _UsersRepository = require("../../../users/users/typeorm/repositories/UsersRepository");
var _ClientsRepository = require("../../clients/typeorm/repositories/ClientsRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateGuidelineService {
  async execute({
    guideline,
    comments,
    date,
    client_id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const guidelineRepo = (0, _typeorm.getCustomRepository)(_Guideline.ClientGuidelineRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default("User don't exist", 404);
    const clientExist = await clientsRepo.findOne({
      id: client_id,
      user_id: userExists.user_id
    });
    if (!clientExist) throw new _AppError.default('Esse paciente não existe', 404);
    const newGuideline = guidelineRepo.create({
      guideline,
      comments,
      date,
      client_id: clientExist.id,
      user_id: userExists.user_id
    });
    await guidelineRepo.save(newGuideline);
    return newGuideline;
  }
}
var _default = CreateGuidelineService;
exports.default = _default;
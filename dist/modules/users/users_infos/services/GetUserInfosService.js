"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsersInfosRepository = require("../typeorm/repositories/UsersInfosRepository");
var _UsersRepository = require("../../users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _DTO = require("../../../../shared/DTO");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetUsersInfosService {
  async execute({
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const usersInfosRepo = (0, _typeorm.getCustomRepository)(_UsersInfosRepository.UsersInfosRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default("User don't exist", 404);
    const usersInfosExists = await usersInfosRepo.findOne({
      user_id: userExists.user_id
    });
    if (!usersInfosExists) throw new _AppError.default("Don't exist infos registry for this user", 404);
    let mapUser = {
      description: usersInfosExists.description,
      professional_mail: usersInfosExists.professional_mail,
      celphone: usersInfosExists.celphone,
      second_celphone: usersInfosExists.second_celphone,
      website: usersInfosExists.website,
      instagram: usersInfosExists.instagram,
      twitter: usersInfosExists.twitter,
      tiktok: usersInfosExists.tiktok,
      created_at: usersInfosExists.created_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE),
      updated_at: usersInfosExists.created_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE)
    };
    return mapUser;
  }
}
var _default = GetUsersInfosService;
exports.default = _default;
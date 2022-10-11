"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsersInfosRepository = require("../typeorm/repositories/UsersInfosRepository");
var _UsersRepository = require("../../users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdateUsersInfosService {
  async execute({
    user_code,
    description,
    professional_mail,
    celphone,
    second_celphone,
    website,
    instagram,
    twitter,
    tiktok
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
    usersInfosExists.description = description;
    usersInfosExists.professional_mail = professional_mail;
    usersInfosExists.celphone = celphone;
    usersInfosExists.second_celphone = second_celphone;
    usersInfosExists.website = website;
    usersInfosExists.instagram = instagram;
    usersInfosExists.twitter = twitter;
    usersInfosExists.tiktok = tiktok;
    await usersInfosRepo.save(usersInfosExists);
    return usersInfosExists;
  }
}
var _default = UpdateUsersInfosService;
exports.default = _default;
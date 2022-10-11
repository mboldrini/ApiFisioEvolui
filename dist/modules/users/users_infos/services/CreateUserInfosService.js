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
class CreateUsersInfosService {
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
    if (usersInfosExists) throw new _AppError.default('Already exist a infos registry for this user', 404);
    const userInfos = usersInfosRepo.create({
      description,
      professional_mail,
      celphone,
      second_celphone,
      website,
      instagram,
      twitter,
      tiktok,
      user_id: userExists.user_id
    });
    await usersInfosRepo.save(userInfos);
    return userInfos;
  }
}
var _default = CreateUsersInfosService;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _DTO = require("../../../../shared/DTO");
var _UsersConfigsRepository = require("./../typeorm/repositories/UsersConfigsRepository");
var _UsersRepository = require("../../users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetUserConfigsService {
  async execute({
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const userConfigRepo = (0, _typeorm.getCustomRepository)(_UsersConfigsRepository.UsersConfigsRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default("User don't exist", 404);
    const userConfigsExist = await userConfigRepo.findOne({
      user_id: userExists.user_id
    });
    if (!userConfigsExist) throw new _AppError.default("Don't exist configs registry for this user", 404);
    const userConfigs = {
      allow_retroactiveDate: userConfigsExist.allow_retroactiveDate,
      allow_notifications: userConfigsExist.allow_notifications,
      schedule_startDay: userConfigsExist.schedule_startDay,
      user_premium: userConfigsExist.user_premium,
      premium_type: userConfigsExist.premium_type,
      premium_until: userConfigsExist.premium_until,
      created_at: userConfigsExist.created_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE),
      updated_at: userConfigsExist.updated_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE)
    };
    return userConfigs;
  }
}
var _default = GetUserConfigsService;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsersConfigsRepository = require("./../typeorm/repositories/UsersConfigsRepository");
var _UsersRepository = require("../../users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdateUserConfigsService {
  async execute({
    user_code,
    allow_retroactiveDate,
    allow_notifications,
    schedule_startDay,
    user_premium,
    premium_type
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
    userConfigsExist.allow_retroactiveDate = allow_retroactiveDate;
    userConfigsExist.allow_notifications = allow_notifications;
    userConfigsExist.schedule_startDay = schedule_startDay;
    userConfigsExist.user_premium = user_premium;
    userConfigsExist.premium_type = premium_type;
    await userConfigRepo.save(userConfigsExist);
    const updatedConfigs = {
      allow_retroactiveDate: userConfigsExist.allow_retroactiveDate,
      allow_notifications: userConfigsExist.allow_notifications,
      schedule_startDay: userConfigsExist.schedule_startDay,
      user_premium: userConfigsExist.user_premium,
      premium_type: userConfigsExist.premium_type
    };
    return updatedConfigs;
  }
}
var _default = UpdateUserConfigsService;
exports.default = _default;
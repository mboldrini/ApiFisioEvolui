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
class CreateUserConfigsService {
  async execute({
    user_code,
    allow_retroactiveDate,
    allow_notifications,
    schedule_startDay,
    user_premium,
    premium_type,
    premium_until
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
    if (userConfigsExist) throw new _AppError.default('Already exist a configs registry for this user', 404);
    const userConfigs = userConfigRepo.create({
      allow_retroactiveDate: allow_retroactiveDate ? allow_retroactiveDate : false,
      allow_notifications: allow_notifications ? allow_notifications : false,
      schedule_startDay: schedule_startDay ? schedule_startDay : true,
      user_premium: user_premium ? user_premium : false,
      premium_type: premium_type ? premium_type : 0,
      premium_until: premium_until ? premium_until : '2055-1-1',
      user_id: userExists.user_id
    });
    await userConfigRepo.save(userConfigs);
    return userConfigs;
  }
}
var _default = CreateUserConfigsService;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UserWorkDaysRepository = require("../typeorm/repositories/UserWorkDaysRepository");
var _UsersRepository = _interopRequireDefault(require("../../users/typeorm/repositories/UsersRepository"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateUserWorkDaysService {
  async execute({
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const userWorkDayRepo = (0, _typeorm.getCustomRepository)(_UserWorkDaysRepository.UserWorkDaysRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default('Esse usuário não existe - wkdays', 404);
    const workdayExist = await userWorkDayRepo.findOne({
      user_id: userExists.user_id
    });
    if (workdayExist) throw new _AppError.default('Already exist an workday created for this user');
    const userWorkDay = userWorkDayRepo.create({
      user_id: userExists.user_id,
      sunday: false,
      sunday_startHour: '08:00:00.000-03:00',
      sunday_endHour: '08:01:00.000-03:00',
      monday: true,
      monday_startHour: '08:00:00.000-03:00',
      monday_endHour: '18:00:00.000-03:00',
      tuesday: true,
      tuesday_startHour: '08:00:00.000-03:00',
      tuesday_endHour: '18:00:00.000-03:00',
      wednesday: true,
      wednesday_startHour: '08:00:00.000-03:00',
      wednesday_endHour: '18:00:00.000-03:00',
      thursday: true,
      thursday_startHour: '08:00:00.000-03:00',
      thursday_endHour: '18:00:00.000-03:00',
      friday: true,
      friday_startHour: '08:00:00.000-03:00',
      friday_endHour: '18:00:00.000-03:00',
      saturday: false,
      saturday_startHour: '08:00:00.000-03:00',
      saturday_endHour: '12:00:00.000-03:00'
    });
    await userWorkDayRepo.save(userWorkDay);
    return userWorkDay;
  }
}
var _default = CreateUserWorkDaysService;
exports.default = _default;
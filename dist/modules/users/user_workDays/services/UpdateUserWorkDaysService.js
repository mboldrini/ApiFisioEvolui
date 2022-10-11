"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UserWorkDaysRepository = require("../typeorm/repositories/UserWorkDaysRepository");
var _UsersRepository = _interopRequireDefault(require("../../users/typeorm/repositories/UsersRepository"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _UsersConfigsRepository = _interopRequireDefault(require("../../users_configs/typeorm/repositories/UsersConfigsRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdateUserWorkDaysService {
  async execute({
    user_code,
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const userConfigRepo = (0, _typeorm.getCustomRepository)(_UsersConfigsRepository.default);
    const userWorkDayRepo = (0, _typeorm.getCustomRepository)(_UserWorkDaysRepository.UserWorkDaysRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default('Esse usuário não existe', 404);
    const userConfigExists = await userConfigRepo.findOne({
      user_id: userExists.user_id
    });
    if (!userConfigExists) throw new _AppError.default('Não existe configs p/ esse usuário', 404);
    const workdayExist = await userWorkDayRepo.findOne({
      user_id: userExists.user_id
    });
    if (!workdayExist) throw new _AppError.default('Não existe configuração de dias p/ esse usuário');

    // if (!userConfigExists.user_premium)
    // 	throw new AppError("Only premium user's can change the work days/hours", 404);

    if (sunday) {
      workdayExist.sunday = sunday.enabled;
      workdayExist.sunday_startHour = sunday.start;
      workdayExist.sunday_endHour = sunday.end;
    }
    if (monday) {
      workdayExist.monday = monday.enabled;
      workdayExist.monday_startHour = monday.start;
      workdayExist.monday_endHour = monday.end;
    }
    if (tuesday) {
      workdayExist.tuesday = tuesday.enabled;
      workdayExist.tuesday_startHour = tuesday.start;
      workdayExist.tuesday_endHour = tuesday.end;
    }
    if (wednesday) {
      workdayExist.wednesday = wednesday.enabled;
      workdayExist.wednesday_startHour = wednesday.start;
      workdayExist.wednesday_endHour = wednesday.end;
    }
    if (thursday) {
      workdayExist.thursday = thursday.enabled;
      workdayExist.thursday_startHour = thursday.start;
      workdayExist.thursday_endHour = thursday.end;
    }
    if (friday) {
      workdayExist.friday = friday.enabled;
      workdayExist.friday_startHour = friday.start;
      workdayExist.friday_endHour = friday.end;
    }
    if (saturday) {
      workdayExist.saturday = saturday.enabled;
      workdayExist.saturday_startHour = saturday.start;
      workdayExist.saturday_endHour = saturday.end;
    }
    const userWorkDay = userWorkDayRepo.save(workdayExist);
    const workDayReturn = {
      created_at: workdayExist.created_at,
      updated_at: workdayExist.updated_at,
      sunday: {
        enabled: workdayExist.sunday,
        start: workdayExist.sunday_startHour,
        end: workdayExist.sunday_endHour
      },
      monday: {
        enabled: workdayExist.monday,
        start: workdayExist.monday_startHour,
        end: workdayExist.monday_endHour
      },
      tuesday: {
        enabled: workdayExist.tuesday,
        start: workdayExist.tuesday_startHour,
        end: workdayExist.tuesday_endHour
      },
      wednesday: {
        enabled: workdayExist.wednesday,
        start: workdayExist.wednesday_startHour,
        end: workdayExist.wednesday_endHour
      },
      thursday: {
        enabled: workdayExist.thursday,
        start: workdayExist.thursday_startHour,
        end: workdayExist.thursday_endHour
      },
      friday: {
        enabled: workdayExist.friday,
        start: workdayExist.friday_startHour,
        end: workdayExist.friday_endHour
      },
      saturday: {
        enabled: workdayExist.saturday,
        start: workdayExist.saturday_startHour,
        end: workdayExist.saturday_endHour
      }
    };
    return workDayReturn;
  }
}
var _default = UpdateUserWorkDaysService;
exports.default = _default;
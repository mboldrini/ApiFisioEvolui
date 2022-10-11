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
class GetUserWorkDaysService {
  async execute({
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const userWorkDayRepo = (0, _typeorm.getCustomRepository)(_UserWorkDaysRepository.UserWorkDaysRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default('Usuário não existe', 404);
    const workdayExist = await userWorkDayRepo.findOne({
      user_id: userExists.user_id
    });
    if (!workdayExist) throw new _AppError.default('Não existe configuração p/ esse usuário');
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
var _default = GetUserWorkDaysService;
exports.default = _default;
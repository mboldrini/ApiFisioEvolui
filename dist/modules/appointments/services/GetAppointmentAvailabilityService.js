"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UserWorkDaysRepository = require("./../../users/user_workDays/typeorm/repositories/UserWorkDaysRepository");
var _UsersConfigsRepository = require("./../../users/users_configs/typeorm/repositories/UsersConfigsRepository");
var _validateFunctions = require("./../DTO/validateFunctions");
var _ServicesTypesRepository = require("./../../services_types/typeorm/repositories/ServicesTypesRepository");
var _AppointmentsRepository = require("./../typeorm/repositories/AppointmentsRepository");
var _ClientsRepository = require("./../../clients/clients/typeorm/repositories/ClientsRepository");
var _UsersRepository = require("../../users/users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetAppointmentAvailabilityService {
  async execute({
    user_code,
    client_id,
    serviceType_id,
    date_scheduled,
    start_hour
  }) {
    const userRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const userConfigsRepo = (0, _typeorm.getCustomRepository)(_UsersConfigsRepository.UsersConfigsRepository);
    const userWorkDaysRepo = (0, _typeorm.getCustomRepository)(_UserWorkDaysRepository.UserWorkDaysRepository);
    const clientRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const appointmentRepo = (0, _typeorm.getCustomRepository)(_AppointmentsRepository.AppointmentsRepository);
    const serviceTypeRepo = (0, _typeorm.getCustomRepository)(_ServicesTypesRepository.ServicesTypesRepository);
    const userExist = await userRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default("This user don't exist", 404);
    const userConfigs = await userConfigsRepo.findOne({
      user_id: userExist.user_id
    });
    if (!userConfigs) throw new _AppError.default("Don't exist an user config for this user", 404);

    // const clientExist = await clientRepo.findOne({ id: client_id });
    // if (!clientExist) throw new AppError("This client don't exist");

    const serviceTypeExist = await serviceTypeRepo.findOne({
      id: serviceType_id
    });
    if (!serviceTypeExist) throw new _AppError.default("This service type don't exist", 404);
    const userWorkDaysExist = await userWorkDaysRepo.findOne({
      user_id: userExist.user_id
    });
    if (!userWorkDaysExist) throw new _AppError.default("Don't exist an workday created for this user");
    const workDayInfos = (0, _validateFunctions.GetWorkDayInfos)(date_scheduled, userWorkDaysExist, userConfigs.user_premium);
    if (!workDayInfos.work) throw new _AppError.default('This date is not available for appointment', 404);
    const allDayAppointments = await appointmentRepo.find({
      date_scheduled,
      scheduled: true
    });
    let theAppointment = {
      date_scheduled,
      start_hour,
      duration: serviceTypeExist.duration,
      end_hour: (0, _validateFunctions.SetEndHour)(start_hour, serviceTypeExist.duration),
      price: serviceTypeExist === null || serviceTypeExist === void 0 ? void 0 : serviceTypeExist.price,
      scheduled: true,
      user_id: userExist === null || userExist === void 0 ? void 0 : userExist.user_id,
      // client_id,
      serviceType_id
    };
    let isAvailable = (0, _validateFunctions.VerifyAllDaySchedules)(allDayAppointments, theAppointment);
    let infos = {
      startHour: workDayInfos.start_hour,
      endHour: workDayInfos.end_hour,
      serviceDuration: serviceTypeExist.duration,
      dateScheduled: date_scheduled,
      user_id: userExist.user_id,
      serviceType_id: serviceTypeExist.id
      // client_id: clientExist.id,
    };

    let allPossibleHours = (0, _validateFunctions.GetAllPossibleAppointmentsHours)(infos);
    let availableHoursList = [];
    allPossibleHours.forEach(hoursAvailabled => {
      if ((0, _validateFunctions.VerifyAllDaySchedules)(allDayAppointments, hoursAvailabled)) {
        availableHoursList.push(hoursAvailabled);
      }
    });
    let result = {
      available: isAvailable,
      hours_availabled: availableHoursList
    };
    return result;

    // if (VerifyAllDaySchedules(allDayAppointments, theAppointment)) {
    // 	return {
    // 		available: true,
    // 	};
    // } else {

    // }
  }
}
var _default = GetAppointmentAvailabilityService;
exports.default = _default;
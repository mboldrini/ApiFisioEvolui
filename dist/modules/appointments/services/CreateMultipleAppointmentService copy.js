"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsersConfigsRepository = require("../../users/users_configs/typeorm/repositories/UsersConfigsRepository");
var _validateFunctions = require("../DTO/validateFunctions");
var _ServicesTypesRepository = require("../../services_types/typeorm/repositories/ServicesTypesRepository");
var _AppointmentsRepository = require("../typeorm/repositories/AppointmentsRepository");
var _ClientsRepository = require("../../clients/clients/typeorm/repositories/ClientsRepository");
var _UsersRepository = require("../../users/users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateMutipleAppointmentService {
  async execute({
    user_code,
    client_id,
    serviceType_id,
    appointments
  }) {
    const userRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const appointmentRepo = (0, _typeorm.getCustomRepository)(_AppointmentsRepository.AppointmentsRepository);
    const serviceTypeRepo = (0, _typeorm.getCustomRepository)(_ServicesTypesRepository.ServicesTypesRepository);
    const userConfigsRepo = (0, _typeorm.getCustomRepository)(_UsersConfigsRepository.UsersConfigsRepository);
    const userExist = await userRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default('Esse usuário não existte');
    const userConfigsExist = await userConfigsRepo.findOne({
      user_id: userExist.user_id
    });
    const clientExist = await clientRepo.findOne({
      id: client_id
    });
    if (!clientExist) throw new _AppError.default('Esse cliente não existe');
    const serviceTypeExist = await serviceTypeRepo.findOne({
      id: serviceType_id
    });
    if (!serviceTypeExist) throw new _AppError.default('Esse tipo de serviço não existe', 404);
    let newAppointmentsList = appointments.map(appointment => ({
      user_id: userExist.user_id,
      serviceType_id: serviceType_id,
      client_id: client_id,
      description: '',
      comments: '',
      status: 1,
      type: appointment.type,
      date_scheduled: appointment.date_scheduled,
      start_hour: appointment.start_hour,
      duration: serviceTypeExist.duration,
      end_hour: (0, _validateFunctions.SetEndHour)(appointment.start_hour, serviceTypeExist.duration),
      price: serviceTypeExist.price,
      scheduled: true
    }));
    let newAppointmentsList2 = newAppointmentsList.filter((a, i) => newAppointmentsList.findIndex(s => a.start_hour === s.start_hour && a.date_scheduled === s.date_scheduled) === i);
    const appointment = await appointmentRepo.create(newAppointmentsList2);
    const newAppointment = await appointmentRepo.save(appointment);
    return newAppointment;
  }
}
var _default = CreateMutipleAppointmentService;
exports.default = _default;
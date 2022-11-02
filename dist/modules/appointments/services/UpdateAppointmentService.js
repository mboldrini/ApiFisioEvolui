"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ServicePaymentRepository = require("./../../service_payment/typeorm/repositories/ServicePaymentRepository");
var _validateFunctions = require("./../DTO/validateFunctions");
var _ServicesTypesRepository = require("./../../services_types/typeorm/repositories/ServicesTypesRepository");
var _AppointmentsRepository = require("./../typeorm/repositories/AppointmentsRepository");
var _ClientsRepository = require("./../../clients/clients/typeorm/repositories/ClientsRepository");
var _UsersRepository = require("../../users/users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _dateFns = require("date-fns");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdateAppointmentService {
  async execute({
    id,
    user_code,
    client_id,
    serviceType_id,
    description,
    comments,
    status,
    type,
    date_scheduled,
    start_hour
  }) {
    const userRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const appointmentRepo = (0, _typeorm.getCustomRepository)(_AppointmentsRepository.AppointmentsRepository);
    const serviceTypeRepo = (0, _typeorm.getCustomRepository)(_ServicesTypesRepository.ServicesTypesRepository);
    const servicePaymentRepo = (0, _typeorm.getCustomRepository)(_ServicePaymentRepository.ServicePaymentRepository);
    const userExist = await userRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default("This user don't exist");
    const clientExist = await clientRepo.findOne({
      id: client_id
    });
    if (!clientExist) throw new _AppError.default("This client don't exist");
    const serviceTypeExist = await serviceTypeRepo.findOne({
      id: serviceType_id
    });
    if (!serviceTypeExist) throw new _AppError.default("This service type don't exist", 404);
    const appointment = await appointmentRepo.findOne({
      id: id,
      user_id: userExist.user_id
    });
    if (!appointment) throw new _AppError.default("This appointment don't exist", 404);
    const servicePaymentExist = await servicePaymentRepo.findOne({
      appointment_id: appointment.id,
      user_id: userExist.user_id
    });
    const allDayAppointments = await appointmentRepo.find({
      date_scheduled,
      scheduled: true
    });
    const oldappointment = {
      description,
      comments,
      status,
      type,
      date_scheduled,
      start_hour,
      duration: serviceTypeExist.duration,
      end_hour: (0, _validateFunctions.SetEndHour)(start_hour, serviceTypeExist.duration),
      price: serviceTypeExist.price,
      scheduled: true,
      user_id: userExist.user_id,
      client_id,
      serviceType_id
    };
    if (!(0, _dateFns.isSameDay)(new Date(date_scheduled), appointment.date_scheduled)) {
      if (((0, _dateFns.isSameDay)(new Date(date_scheduled), new Date(appointment.date_scheduled)) == false || appointment.start_hour != start_hour) && !(0, _validateFunctions.VerifyAllDaySchedules)(allDayAppointments, oldappointment)) {
        throw new _AppError.default('Já existe um agendamento p/ o horário escolhido');
      }
    }
    if (servicePaymentExist) {
      servicePaymentExist.price = serviceTypeExist.price;
      servicePaymentExist.serviceType_id = serviceTypeExist.id;
      await servicePaymentRepo.save(servicePaymentExist);
    }
    if (appointment) {
      const newStatus = ValidaStatus(status);
      const newType = ValidaType(status, type);
      appointment.serviceType_id = serviceType_id;
      if (description) {
        appointment.description = description;
      }
      if (comments) {
        appointment.comments = comments;
      }
      appointment.status = newStatus;
      appointment.type = newType;
      appointment.date_scheduled = date_scheduled;
      appointment.start_hour = start_hour;
      appointment.duration = serviceTypeExist.duration;
      appointment.end_hour = (0, _validateFunctions.SetEndHour)(start_hour, serviceTypeExist.duration);
      appointment.price = serviceTypeExist.price;
      appointment.serviceType_id = serviceType_id;
      const newAppointment = await appointmentRepo.save(appointment);
      return newAppointment;
    }
    return {
      message: 'fail'
    };
  }
}
function ValidaStatus(status) {
  if (status == 3) {
    return 1;
  }
  if (status == 0) {
    return 1;
  }
  return status;
}
function ValidaType(status, type) {
  if (type == 0) {
    return 2;
  }
  if (type == 1) {
    return 3;
  }
  return type;
}
var _default = UpdateAppointmentService;
exports.default = _default;
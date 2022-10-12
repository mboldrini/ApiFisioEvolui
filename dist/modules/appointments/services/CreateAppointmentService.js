"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ServicePaymentRepository = require("./../../service_payment/typeorm/repositories/ServicePaymentRepository");
var _UsersConfigsRepository = require("./../../users/users_configs/typeorm/repositories/UsersConfigsRepository");
var _validateFunctions = require("./../DTO/validateFunctions");
var _ServicesTypesRepository = require("./../../services_types/typeorm/repositories/ServicesTypesRepository");
var _AppointmentsRepository = require("./../typeorm/repositories/AppointmentsRepository");
var _ClientsRepository = require("./../../clients/clients/typeorm/repositories/ClientsRepository");
var _UsersRepository = require("../../users/users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateAppointmentService {
  async execute({
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
    const userConfigsRepo = (0, _typeorm.getCustomRepository)(_UsersConfigsRepository.UsersConfigsRepository);
    const userExist = await userRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default("This user don't exist");
    const userConfigsExist = await userConfigsRepo.findOne({
      user_id: userExist.user_id
    });
    const clientExist = await clientRepo.findOne({
      id: client_id
    });
    if (!clientExist) throw new _AppError.default("This client don't exist");
    const serviceTypeExist = await serviceTypeRepo.findOne({
      id: serviceType_id
    });
    if (!serviceTypeExist) throw new _AppError.default("This service type don't exist", 404);
    const allDayAppointments = await appointmentRepo.find({
      date_scheduled,
      scheduled: true
    });
    let theAppointment = {
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
    if (!(0, _validateFunctions.VerifyAllDaySchedules)(allDayAppointments, theAppointment)) {
      throw new _AppError.default('Already exist an appointment for the selected hour');
    }
    const appointment = await appointmentRepo.create(theAppointment);
    const newAppointment = await appointmentRepo.save(appointment);
    if (userConfigsExist?.user_premium) {
      const servicePaymentRepo = (0, _typeorm.getCustomRepository)(_ServicePaymentRepository.ServicePaymentRepository);
      const payment = await servicePaymentRepo.create({
        user_id: userExist.user_id,
        serviceType_id: serviceTypeExist.id,
        comments: ' ',
        appointment_id: newAppointment.id,
        status: 0,
        scheduled: newAppointment.scheduled,
        price: serviceTypeExist.price
      });
      const newPayment = await servicePaymentRepo.save(payment);
    }
    return newAppointment;
  }
}
var _default = CreateAppointmentService;
exports.default = _default;
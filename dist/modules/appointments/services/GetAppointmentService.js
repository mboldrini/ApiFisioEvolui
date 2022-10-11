"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ServicesTypesRepository = require("./../../services_types/typeorm/repositories/ServicesTypesRepository");
var _ClientsRepository = require("../../clients/clients/typeorm/repositories/ClientsRepository");
var _AppointmentsRepository = require("../typeorm/repositories/AppointmentsRepository");
var _UsersRepository = require("../../users/users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _dateFns = require("date-fns");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import { TIMEZONE_LANGUAGE, TIMEZONE_LOCALE } from '../../../shared/DTO';

function GetDateString(date) {
  return (0, _dateFns.format)(date, 'yyyy-MM-dd');
}
class GetAppointmentService {
  async execute({
    id,
    client_id,
    user_code
  }) {
    const userRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const appointmentRepo = (0, _typeorm.getCustomRepository)(_AppointmentsRepository.AppointmentsRepository);
    const clientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const servicesTypesRepo = (0, _typeorm.getCustomRepository)(_ServicesTypesRepository.ServicesTypesRepository);
    const userExist = await userRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default('Esse usuário não existe');
    const client = await clientsRepo.findOne({
      user_id: userExist.user_id,
      id: client_id,
      enabled: true
    });
    if (!client) throw new _AppError.default('Esse paciente não existe!');
    const appointment = await appointmentRepo.findOne({
      id,
      user_id: userExist.user_id,
      scheduled: true
    });
    if (!appointment) throw new _AppError.default('Esse agendamento não existe!');
    const serviceType = await servicesTypesRepo.findOne({
      id: client.serviceType_id
    });
    if (!serviceType) throw new _AppError.default('O tipo de atendimento não existe!');
    let appointmentNew = {
      id: appointment.id,
      description: appointment.description,
      comments: appointment.comments,
      status: appointment.status,
      type: appointment.type,
      date_scheduled: appointment.date_scheduled,
      start_hour: appointment.start_hour,
      end_hour: appointment.end_hour,
      duration: appointment.duration,
      price: appointment.price,
      scheduled: appointment.scheduled,
      serviceType_id: appointment.serviceType_id,
      serviceType_name: serviceType.name,
      created_at: appointment.created_at,
      updated_at: appointment.updated_at
    };

    // let appointmentsList = appointments.map(appointment => ({
    // 	id: appointment.id,
    // 	status: appointment.status,
    // 	type: appointment.type,
    // 	date_scheduled: appointment.date_scheduled,
    // 	start_hour: appointment.start_hour,
    // 	end_hour: appointment.end_hour,
    // 	duration: appointment.duration,
    // 	scheduled: appointment.scheduled,
    // 	serviceType_id: appointment.serviceType_id,
    // 	client_id: appointment.client_id,
    // 	client_name: clients
    // 		.filter(client => {
    // 			if (client.id == appointment.client_id) return client.name;
    // 		})
    // 		.map(client => {
    // 			return client.name;
    // 		})[0],
    // }));

    // appointmentsList.forEach(appoint => {
    // 	if (!(GetDateString(appoint.date_scheduled) in dates)) {
    // 		dates[GetDateString(appoint.date_scheduled)] = [];
    // 	}
    // 	dates[GetDateString(appoint.date_scheduled)] = [...dates[GetDateString(appoint.date_scheduled)], appoint];
    // });

    return appointmentNew;
  }
}
var _default = GetAppointmentService;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ClientsRepository = require("../../clients/clients/typeorm/repositories/ClientsRepository");
var _AppointmentsRepository = require("../typeorm/repositories/AppointmentsRepository");
var _UsersRepository = require("../../users/users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _dateFns = require("date-fns");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function GetDateString(date) {
  return (0, _dateFns.format)(date, 'yyyy-MM-dd');
}
class GetAllDayAppoinntmentsService {
  async execute({
    user_code,
    date_scheduled
  }) {
    const userRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const appointmentRepo = (0, _typeorm.getCustomRepository)(_AppointmentsRepository.AppointmentsRepository);
    const clientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const userExist = await userRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default("This user don't exist");
    const clients = await clientsRepo.find({
      user_id: userExist.user_id
    });
    const appointments = await appointmentRepo.find({
      date_scheduled,
      user_id: userExist.user_id,
      scheduled: true
    });
    let appointmentsList = appointments.map(appointment => ({
      id: appointment.id,
      status: appointment.status,
      type: appointment.type,
      date_scheduled: appointment.date_scheduled,
      start_hour: appointment.start_hour,
      end_hour: appointment.end_hour,
      duration: appointment.duration,
      scheduled: appointment.scheduled,
      serviceType_id: appointment.serviceType_id,
      client_id: appointment.client_id,
      client_name: clients.filter(client => {
        if (client.id == appointment.client_id) return client.name;
      }).map(client => {
        return client.name;
      })[0]
    }));

    // appointmentsList.forEach(appoint => {
    // 	if (!(GetDateString(appoint.date_scheduled) in dates)) {
    // 		dates[GetDateString(appoint.date_scheduled)] = [];
    // 	}
    // 	dates[GetDateString(appoint.date_scheduled)] = [...dates[GetDateString(appoint.date_scheduled)], appoint];
    // });

    return appointmentsList;
  }
}
var _default = GetAllDayAppoinntmentsService;
exports.default = _default;
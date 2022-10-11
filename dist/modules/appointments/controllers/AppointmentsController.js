"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CancelAppointmentService = _interopRequireDefault(require("../services/CancelAppointmentService"));
var _CreateAppointmentService = _interopRequireDefault(require("../services/CreateAppointmentService"));
var _DeleteAppointmentService = _interopRequireDefault(require("../services/DeleteAppointmentService"));
var _GetAllDayAppoinntmentsService = _interopRequireDefault(require("../services/GetAllDayAppoinntmentsService"));
var _GetAppointmentAvailabilityService = _interopRequireDefault(require("../services/GetAppointmentAvailabilityService"));
var _UpdateAppointmentService = _interopRequireDefault(require("../services/UpdateAppointmentService"));
var _GetAllMonthAppointmentsService = _interopRequireDefault(require("../services/GetAllMonthAppointmentsService"));
var _GetAppointmentService = _interopRequireDefault(require("../services/GetAppointmentService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class AppointmentsController {
  async create(request, response) {
    const {
      client_id,
      serviceType_id,
      description,
      comments,
      status,
      type,
      date_scheduled,
      start_hour
    } = request.body;
    const {
      user_code
    } = request.user;
    const appointmentSrvc = new _CreateAppointmentService.default();
    const appointment = await appointmentSrvc.execute({
      user_code,
      serviceType_id,
      client_id,
      description,
      comments,
      status,
      type,
      date_scheduled,
      start_hour
    });
    return response.json(appointment);
  }
  async update(request, response) {
    const {
      client_id,
      serviceType_id,
      description,
      comments,
      status,
      type,
      date_scheduled,
      start_hour
    } = request.body;
    const {
      user_code
    } = request.user;
    const {
      id
    } = request.params;
    const appointment_id = parseInt(id);
    const appointmentSrvc = new _UpdateAppointmentService.default();
    const appointment = await appointmentSrvc.execute({
      id: appointment_id,
      user_code,
      serviceType_id,
      client_id,
      description,
      comments,
      status,
      type,
      date_scheduled,
      start_hour
    });
    return response.json(appointment);
  }
  async getAppointment(request, response) {
    const {
      id,
      client_id
    } = request.params;
    const {
      user_code
    } = request.user;
    const appointmentSrvc = new _GetAppointmentService.default();
    const appointment = await appointmentSrvc.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(appointment);
  }
  async getAvailability(request, response) {
    const {
      client_id,
      serviceType_id,
      date_scheduled,
      start_hour
    } = request.body;
    const {
      user_code
    } = request.user;
    const appointmentSrvc = new _GetAppointmentAvailabilityService.default();
    const appointment = await appointmentSrvc.execute({
      user_code,
      serviceType_id,
      client_id,
      date_scheduled,
      start_hour
    });
    return response.json(appointment);
  }
  async cancelAppointment(request, response) {
    const {
      id
    } = request.params;
    const {
      user_code
    } = request.user;
    const appointment_id = parseInt(id);
    const appointmentSrvc = new _CancelAppointmentService.default();
    const appointment = await appointmentSrvc.execute({
      user_code,
      appointment_id
    });
    return response.json(appointment);
  }
  async deleteAppointment(request, response) {
    const {
      id
    } = request.params;
    const {
      user_code
    } = request.user;
    const appointment_id = parseInt(id);
    const appointmentSrvc = new _DeleteAppointmentService.default();
    const appointment = await appointmentSrvc.execute({
      user_code,
      appointment_id
    });
    return response.json(appointment);
  }
  async getAllDayAppointments(request, response) {
    const {
      date
    } = request.body;
    const {
      user_code
    } = request.user;
    const appointmentSrvc = new _GetAllDayAppoinntmentsService.default();
    const appointment = await appointmentSrvc.execute({
      user_code,
      date_scheduled: date
    });
    return response.json(appointment);
  }
  async getAllMonthAppointments(request, response) {
    const {
      client_id,
      date
    } = request.params;
    const {
      user_code
    } = request.user;
    const appointmentSrvc = new _GetAllMonthAppointmentsService.default();
    const appointment = await appointmentSrvc.execute({
      client_id: parseInt(client_id),
      user_code,
      date
    });
    return response.json(appointment);
  }
}
exports.default = AppointmentsController;
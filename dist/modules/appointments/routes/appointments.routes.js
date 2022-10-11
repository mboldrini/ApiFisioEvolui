"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var _AppointmentsController = _interopRequireDefault(require("../controllers/AppointmentsController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const appointmentsRouter = (0, _express.Router)();
const appointmentsController = new _AppointmentsController.default();
appointmentsRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    client_id: _celebrate.Joi.number().required(),
    serviceType_id: _celebrate.Joi.number().required(),
    description: _celebrate.Joi.string().optional(),
    comments: _celebrate.Joi.string().optional(),
    status: _celebrate.Joi.number().required(),
    type: _celebrate.Joi.number().required(),
    date_scheduled: _celebrate.Joi.string().required(),
    start_hour: _celebrate.Joi.string().required()
  }
}), appointmentsController.create);
appointmentsRouter.get('/:id&:client_id', _isAuthenticated.default, appointmentsController.getAppointment);
appointmentsRouter.patch('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    client_id: _celebrate.Joi.number().required(),
    serviceType_id: _celebrate.Joi.number().required(),
    description: _celebrate.Joi.string().optional(),
    comments: _celebrate.Joi.string().optional(),
    status: _celebrate.Joi.number().required(),
    type: _celebrate.Joi.number().required(),
    date_scheduled: _celebrate.Joi.string().required(),
    start_hour: _celebrate.Joi.string().required()
  }
}), appointmentsController.update);
appointmentsRouter.post('/availability', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    // client_id: Joi.number().required(),
    serviceType_id: _celebrate.Joi.number().required(),
    date_scheduled: _celebrate.Joi.string().required(),
    start_hour: _celebrate.Joi.string().required()
  }
}), appointmentsController.getAvailability);
appointmentsRouter.post('/day', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    date: _celebrate.Joi.date().required()
  }
}), appointmentsController.getAllDayAppointments);
appointmentsRouter.patch('/cancel/:id', _isAuthenticated.default, appointmentsController.cancelAppointment);
appointmentsRouter.delete('/delete/:id', _isAuthenticated.default, appointmentsController.deleteAppointment);
appointmentsRouter.get('/month/:client_id&:date', _isAuthenticated.default, appointmentsController.getAllMonthAppointments);
var _default = appointmentsRouter;
exports.default = _default;
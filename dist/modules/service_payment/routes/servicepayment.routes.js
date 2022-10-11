"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var _ServicePaymentController = _interopRequireDefault(require("../controllers/ServicePaymentController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const servicePaymentRouter = (0, _express.Router)();
const servicePaymentController = new _ServicePaymentController.default();
servicePaymentRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    appointment_id: _celebrate.Joi.number().required(),
    comments: _celebrate.Joi.string().optional(),
    status: _celebrate.Joi.number().required(),
    scheduled: _celebrate.Joi.boolean().required(),
    serviceType_id: _celebrate.Joi.number().required()
  }
}), servicePaymentController.create);
servicePaymentRouter.patch('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    appointment_id: _celebrate.Joi.number().required(),
    comments: _celebrate.Joi.string().required(),
    status: _celebrate.Joi.number().required(),
    scheduled: _celebrate.Joi.boolean().required(),
    serviceType_id: _celebrate.Joi.number().required()
  }
}), servicePaymentController.update);
servicePaymentRouter.get('/all', _isAuthenticated.default, servicePaymentController.getAll);
servicePaymentRouter.get('/:id', _isAuthenticated.default, servicePaymentController.get);
servicePaymentRouter.patch('/scheduled/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    scheduled: _celebrate.Joi.boolean().required()
  }
}), servicePaymentController.cancel);
servicePaymentRouter.delete('/:id', _isAuthenticated.default, servicePaymentController.delete);
var _default = servicePaymentRouter;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var _ServicesTypesController = _interopRequireDefault(require("../controllers/ServicesTypesController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const servicesTypesRouter = (0, _express.Router)();
const servicesTypesController = new _ServicesTypesController.default();
servicesTypesRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    description: _celebrate.Joi.string().optional(),
    duration: _celebrate.Joi.string().required(),
    price: _celebrate.Joi.number().required(),
    paymentMethod_id: _celebrate.Joi.number().required()
  }
}), servicesTypesController.create);
servicesTypesRouter.patch('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    description: _celebrate.Joi.string().required(),
    duration: _celebrate.Joi.string().required(),
    price: _celebrate.Joi.number().required(),
    paymentMethod_id: _celebrate.Joi.number().required()
  }
}), servicesTypesController.update);
servicesTypesRouter.get('/:id', _isAuthenticated.default, servicesTypesController.get);
servicesTypesRouter.get('/user/all', _isAuthenticated.default, servicesTypesController.getAll);
servicesTypesRouter.delete('/:id', _isAuthenticated.default, servicesTypesController.delete);
var _default = servicesTypesRouter;
exports.default = _default;
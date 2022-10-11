"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
var _PaymentMethodUserController = _interopRequireDefault(require("../controllers/PaymentMethodUserController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const paymentMethodUserRouter = (0, _express.Router)();
const paymentMethodUserController = new _PaymentMethodUserController.default();
paymentMethodUserRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    description: _celebrate.Joi.string().optional()
  }
}), paymentMethodUserController.create);
paymentMethodUserRouter.patch('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    description: _celebrate.Joi.string().required()
  }
}), paymentMethodUserController.update);
paymentMethodUserRouter.delete('/:id', _isAuthenticated.default, paymentMethodUserController.delete);
paymentMethodUserRouter.get('/:id', _isAuthenticated.default, paymentMethodUserController.get);
paymentMethodUserRouter.get('/user/all', _isAuthenticated.default, paymentMethodUserController.getAll);
var _default = paymentMethodUserRouter;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
var _PaymentMethodController = _interopRequireDefault(require("../controllers/PaymentMethodController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const paymentMethodRouter = (0, _express.Router)();
const paymentMethodController = new _PaymentMethodController.default();
paymentMethodRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required()
  }
}), paymentMethodController.create);
var _default = paymentMethodRouter;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _UsersAddressController = _interopRequireDefault(require("../controllers/UsersAddressController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const usersAddressRouter = (0, _express.Router)();
const usersAddressController = new _UsersAddressController.default();
usersAddressRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    address: _celebrate.Joi.string().optional(),
    number: _celebrate.Joi.number().optional(),
    city: _celebrate.Joi.string().optional(),
    district: _celebrate.Joi.string().optional(),
    state: _celebrate.Joi.string().optional(),
    country: _celebrate.Joi.string().optional()
  }
}), usersAddressController.create);
usersAddressRouter.patch('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    address: _celebrate.Joi.string().required(),
    number: _celebrate.Joi.number().required(),
    city: _celebrate.Joi.string().required(),
    district: _celebrate.Joi.string().required(),
    state: _celebrate.Joi.string().required(),
    country: _celebrate.Joi.string().required()
  }
}), usersAddressController.update);
usersAddressRouter.get('/', _isAuthenticated.default, usersAddressController.get);
var _default = usersAddressRouter;
exports.default = _default;
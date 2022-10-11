"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _UserController = _interopRequireDefault(require("../controllers/UserController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const usersRouter = (0, _express.Router)();
const usersController = new _UserController.default();
usersRouter.get('/', _isAuthenticated.default, usersController.show);
usersRouter.post('/exist', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    magic_code: _celebrate.Joi.string().optional(),
    user_code: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required()
  }
}), usersController.exist);
usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    magic_code: _celebrate.Joi.string().optional(),
    user_code: _celebrate.Joi.string().required(),
    name: _celebrate.Joi.string().required(),
    family_name: _celebrate.Joi.string().required(),
    given_name: _celebrate.Joi.string().required(),
    picture: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    address: _celebrate.Joi.object().keys({
      address: _celebrate.Joi.string().optional(),
      number: _celebrate.Joi.number().optional(),
      city: _celebrate.Joi.string().optional(),
      district: _celebrate.Joi.string().optional(),
      state: _celebrate.Joi.string().optional(),
      country: _celebrate.Joi.string().optional()
    }).optional(),
    infos: _celebrate.Joi.object().keys({
      description: _celebrate.Joi.string().optional(),
      professional_mail: _celebrate.Joi.string().optional(),
      celphone: _celebrate.Joi.string().optional(),
      second_celphone: _celebrate.Joi.string().optional(),
      website: _celebrate.Joi.string().optional(),
      instagram: _celebrate.Joi.string().optional(),
      twitter: _celebrate.Joi.string().optional(),
      tiktok: _celebrate.Joi.string().optional()
    }).optional()
  }
}), usersController.create);
var _default = usersRouter;
exports.default = _default;
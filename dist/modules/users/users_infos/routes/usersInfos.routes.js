"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
var _UsersInfosController = _interopRequireDefault(require("../controllers/UsersInfosController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const usersInfosRouter = (0, _express.Router)();
const usersInfosController = new _UsersInfosController.default();
usersInfosRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    description: _celebrate.Joi.string().optional(),
    professional_mail: _celebrate.Joi.string().optional(),
    celphone: _celebrate.Joi.string().optional(),
    second_celphone: _celebrate.Joi.string().optional(),
    website: _celebrate.Joi.string().optional(),
    instagram: _celebrate.Joi.string().optional(),
    twitter: _celebrate.Joi.string().optional(),
    tiktok: _celebrate.Joi.string().optional()
  }
}), usersInfosController.create);
usersInfosRouter.put('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    description: _celebrate.Joi.string().required(),
    professional_mail: _celebrate.Joi.string().required(),
    celphone: _celebrate.Joi.string().required(),
    second_celphone: _celebrate.Joi.string().required(),
    website: _celebrate.Joi.string().required(),
    instagram: _celebrate.Joi.string().required(),
    twitter: _celebrate.Joi.string().required(),
    tiktok: _celebrate.Joi.string().required()
  }
}), usersInfosController.update);
usersInfosRouter.get('/', _isAuthenticated.default, usersInfosController.get);
usersInfosRouter.get('/statistic', _isAuthenticated.default, usersInfosController.getStatistics);
var _default = usersInfosRouter;
exports.default = _default;
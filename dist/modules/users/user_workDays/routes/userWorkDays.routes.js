"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
var _UserWorkDaysController = _interopRequireDefault(require("../controllers/UserWorkDaysController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userWorkDaysRouter = (0, _express.Router)();
const userWorkDayController = new _UserWorkDaysController.default();

// userWorkDaysRouter.post('/', isAuthenticated, userWorkDayController.create);

userWorkDaysRouter.patch('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    sunday: _celebrate.Joi.object().optional().keys({
      enabled: _celebrate.Joi.boolean().required(),
      start: _celebrate.Joi.string().required(),
      end: _celebrate.Joi.string().required()
    }),
    monday: _celebrate.Joi.object().optional().keys({
      enabled: _celebrate.Joi.boolean().required(),
      start: _celebrate.Joi.string().required(),
      end: _celebrate.Joi.string().required()
    }),
    tuesday: _celebrate.Joi.object().optional().keys({
      enabled: _celebrate.Joi.boolean().required(),
      start: _celebrate.Joi.string().required(),
      end: _celebrate.Joi.string().required()
    }),
    wednesday: _celebrate.Joi.object().optional().keys({
      enabled: _celebrate.Joi.boolean().required(),
      start: _celebrate.Joi.string().required(),
      end: _celebrate.Joi.string().required()
    }),
    thursday: _celebrate.Joi.object().optional().keys({
      enabled: _celebrate.Joi.boolean().required(),
      start: _celebrate.Joi.string().required(),
      end: _celebrate.Joi.string().required()
    }),
    friday: _celebrate.Joi.object().optional().keys({
      enabled: _celebrate.Joi.boolean().required(),
      start: _celebrate.Joi.string().required(),
      end: _celebrate.Joi.string().required()
    }),
    saturday: _celebrate.Joi.object().optional().keys({
      enabled: _celebrate.Joi.boolean().required(),
      start: _celebrate.Joi.string().required(),
      end: _celebrate.Joi.string().required()
    })
  }
}), userWorkDayController.update);
userWorkDaysRouter.get('/', _isAuthenticated.default, userWorkDayController.get);
var _default = userWorkDaysRouter;
exports.default = _default;
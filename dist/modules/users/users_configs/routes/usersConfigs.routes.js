"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
var _UserConfigsController = _interopRequireDefault(require("../controllers/UserConfigsController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const usersConfigsRouter = (0, _express.Router)();
const usersConfigsController = new _UserConfigsController.default();

// usersConfigsRouter.post(
// 	'/',
// 	isAuthenticated,
// 	celebrate({
// 		[Segments.BODY]: {
// 			start_workHour: Joi.string().optional(),
// 			end_workHour: Joi.string().optional(),
// 			allow_retroactiveDate: Joi.boolean().optional(),
// 			allow_notifications: Joi.boolean().optional(),
// 			schedule_startDay: Joi.boolean().optional(),
// 			user_premium: Joi.boolean().optional(),
// 			premium_type: Joi.number().optional(),
// 			premium_until: Joi.string().optional(),
// 		},
// 	}),
// 	usersConfigsController.create,
// );

usersConfigsRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    allow_retroactiveDate: _celebrate.Joi.boolean().required(),
    allow_notifications: _celebrate.Joi.boolean().required(),
    schedule_startDay: _celebrate.Joi.boolean().required(),
    user_premium: _celebrate.Joi.boolean().required(),
    premium_type: _celebrate.Joi.number().required(),
    premium_until: _celebrate.Joi.string().required()
  }
}), usersConfigsController.update);
usersConfigsRouter.get('/', _isAuthenticated.default, usersConfigsController.get);
var _default = usersConfigsRouter;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _SessionsController = _interopRequireDefault(require("../controllers/SessionsController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const sessionsRouter = (0, _express.Router)();
const sessionsController = new _SessionsController.default();
sessionsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    magic_code: _celebrate.Joi.string().optional(),
    user_code: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required()
  }
}), sessionsController.create);
var _default = sessionsRouter;
exports.default = _default;
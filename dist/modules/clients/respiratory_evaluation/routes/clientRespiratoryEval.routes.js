"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
var _ClientRespiratoryEvalController = _interopRequireDefault(require("../controllers/ClientRespiratoryEvalController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const clientResEvalRouter = (0, _express.Router)();
const clientRespEvalController = new _ClientRespiratoryEvalController.default();
clientResEvalRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), clientRespEvalController.create);
clientResEvalRouter.get('/:id&:client_id', _isAuthenticated.default, clientRespEvalController.get);
clientResEvalRouter.patch('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), clientRespEvalController.update);
clientResEvalRouter.delete('/:id&:client_id', _isAuthenticated.default, clientRespEvalController.delete);
clientResEvalRouter.get('/list/:id', _isAuthenticated.default, clientRespEvalController.getList);
var _default = clientResEvalRouter;
exports.default = _default;
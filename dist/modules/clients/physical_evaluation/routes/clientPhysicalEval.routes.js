"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
var _ClientPhysicalEvalController = _interopRequireDefault(require("../controllers/ClientPhysicalEvalController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const clientPEvalRouter = (0, _express.Router)();
const clientPEvalController = new _ClientPhysicalEvalController.default();
clientPEvalRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), clientPEvalController.create);
clientPEvalRouter.get('/:id&:client_id', _isAuthenticated.default, clientPEvalController.get);
clientPEvalRouter.patch('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), clientPEvalController.update);
clientPEvalRouter.delete('/:id&:client_id', _isAuthenticated.default, clientPEvalController.delete);
clientPEvalRouter.get('/list/:id', _isAuthenticated.default, clientPEvalController.getList);
var _default = clientPEvalRouter;
exports.default = _default;
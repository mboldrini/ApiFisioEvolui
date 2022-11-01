"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
var _ClientHdaController = _interopRequireDefault(require("../controllers/ClientHdaController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const clientHdaRouter = (0, _express.Router)();
const clientHdaController = new _ClientHdaController.default();
clientHdaRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), clientHdaController.create);
clientHdaRouter.get('/:id&:client_id', _isAuthenticated.default, clientHdaController.get);
clientHdaRouter.patch('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), clientHdaController.update);
clientHdaRouter.delete('/:id&:client_id', _isAuthenticated.default, clientHdaController.delete);
clientHdaRouter.get('/list/:id', _isAuthenticated.default, clientHdaController.getList);
var _default = clientHdaRouter;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
var _ClientHPPController = _interopRequireDefault(require("../controllers/ClientHPPController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const clientHppRouter = (0, _express.Router)();
const clientHppController = new _ClientHPPController.default();
clientHppRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), clientHppController.create);
clientHppRouter.get('/:id&:client_id', _isAuthenticated.default, clientHppController.get);
clientHppRouter.patch('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), clientHppController.update);
clientHppRouter.delete('/:id&:client_id', _isAuthenticated.default, clientHppController.delete);
clientHppRouter.get('/list/:id', _isAuthenticated.default, clientHppController.getList);
var _default = clientHppRouter;
exports.default = _default;
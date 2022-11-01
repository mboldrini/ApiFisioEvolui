"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
var _ClientObjectiveController = _interopRequireDefault(require("../controllers/ClientObjectiveController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import ClientHppController from '../controllers/ClientHPPController';

const clientObjectiveRouter = (0, _express.Router)();
const clientObjectiveController = new _ClientObjectiveController.default();
clientObjectiveRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), clientObjectiveController.create);
clientObjectiveRouter.get('/:id&:client_id', _isAuthenticated.default, clientObjectiveController.get);
clientObjectiveRouter.patch('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), clientObjectiveController.update);
clientObjectiveRouter.delete('/:id&:client_id', _isAuthenticated.default, clientObjectiveController.delete);
clientObjectiveRouter.get('/list/:id', _isAuthenticated.default, clientObjectiveController.getList);
var _default = clientObjectiveRouter;
exports.default = _default;
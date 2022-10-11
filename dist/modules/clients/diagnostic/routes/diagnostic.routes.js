"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
var _DiagnosticController = _interopRequireDefault(require("../controllers/DiagnosticController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const diagnosticRouter = (0, _express.Router)();
const diagnosticController = new _DiagnosticController.default();
diagnosticRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), diagnosticController.create);
diagnosticRouter.get('/:id&:client_id', _isAuthenticated.default, diagnosticController.get);
diagnosticRouter.delete('/:id&:client_id', _isAuthenticated.default, diagnosticController.delete);
diagnosticRouter.get('/list/:id', _isAuthenticated.default, diagnosticController.getList);
diagnosticRouter.patch('/update/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), diagnosticController.update);
var _default = diagnosticRouter;
exports.default = _default;
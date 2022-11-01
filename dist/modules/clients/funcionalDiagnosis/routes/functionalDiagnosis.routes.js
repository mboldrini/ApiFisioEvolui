"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
var _FunctionalDiagnosisController = _interopRequireDefault(require("../controllers/FunctionalDiagnosisController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const functionalDiagnosisRouter = (0, _express.Router)();
const functionalDiagnosisController = new _FunctionalDiagnosisController.default();
functionalDiagnosisRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), functionalDiagnosisController.create);
functionalDiagnosisRouter.get('/:id&:client_id', _isAuthenticated.default, functionalDiagnosisController.get);
functionalDiagnosisRouter.patch('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), functionalDiagnosisController.update);
functionalDiagnosisRouter.delete('/:id&:client_id', _isAuthenticated.default, functionalDiagnosisController.delete);
functionalDiagnosisRouter.get('/list/:id', _isAuthenticated.default, functionalDiagnosisController.getList);
var _default = functionalDiagnosisRouter;
exports.default = _default;
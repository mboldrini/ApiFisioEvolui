"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var _VersionamentoController = _interopRequireDefault(require("../controllers/VersionamentoController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const versionamentoRouter = (0, _express.Router)();
const versionamenntoController = new _VersionamentoController.default();
versionamentoRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    versao: _celebrate.Joi.string().required(),
    novidades: _celebrate.Joi.string().required(),
    data_publicacao: _celebrate.Joi.date().optional()
  }
}), versionamenntoController.create);
versionamentoRouter.get('/last', _isAuthenticated.default, versionamenntoController.getLastVersion);
versionamentoRouter.patch('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.number().required(),
    versao: _celebrate.Joi.string().optional(),
    novidades: _celebrate.Joi.string().optional(),
    data_publicacao: _celebrate.Joi.date().optional(),
    liberado: _celebrate.Joi.boolean().required()
  }
}), versionamenntoController.update);
versionamentoRouter.get('/list', _isAuthenticated.default, versionamenntoController.lista);
versionamentoRouter.delete('/:id', _isAuthenticated.default, versionamenntoController.delete);
var _default = versionamentoRouter;
exports.default = _default;
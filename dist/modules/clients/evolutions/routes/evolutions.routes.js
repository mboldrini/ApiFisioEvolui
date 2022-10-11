"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
var _EvolutionsController = _interopRequireDefault(require("../controllers/EvolutionsController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const evolutionsRouter = (0, _express.Router)();
const evolutionsController = new _EvolutionsController.default();
evolutionsRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), evolutionsController.create);
evolutionsRouter.get('/:id&:client_id', _isAuthenticated.default, evolutionsController.get);
evolutionsRouter.patch('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), evolutionsController.update);
evolutionsRouter.delete('/:id&:client_id', _isAuthenticated.default, evolutionsController.delete);
evolutionsRouter.get('/list/:id', _isAuthenticated.default, evolutionsController.getList);
var _default = evolutionsRouter;
exports.default = _default;
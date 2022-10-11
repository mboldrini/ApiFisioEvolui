"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
var _GuidelinesController = _interopRequireDefault(require("../controllers/GuidelinesController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const guidelineRouter = (0, _express.Router)();
const guidelineController = new _GuidelinesController.default();
guidelineRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), guidelineController.create);
guidelineRouter.get('/:id&:client_id', _isAuthenticated.default, guidelineController.get);
guidelineRouter.patch('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), guidelineController.update);
guidelineRouter.delete('/:id&:client_id', _isAuthenticated.default, guidelineController.delete);
guidelineRouter.get('/list/:id', _isAuthenticated.default, guidelineController.getList);
var _default = guidelineRouter;
exports.default = _default;
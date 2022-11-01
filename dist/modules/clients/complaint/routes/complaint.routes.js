"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
var _ComplaintController = _interopRequireDefault(require("../controllers/ComplaintController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const complaintRouter = (0, _express.Router)();
const complaintController = new _ComplaintController.default();
complaintRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().required(),
    client_id: _celebrate.Joi.number().required()
  }
}), complaintController.create);
complaintRouter.get('/:id&:client_id', _isAuthenticated.default, complaintController.get);
complaintRouter.patch('/:id&:client_id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    about: _celebrate.Joi.string().required(),
    comments: _celebrate.Joi.string().optional(),
    date: _celebrate.Joi.date().optional()
  }
}), complaintController.update);
complaintRouter.delete('/:id&:client_id', _isAuthenticated.default, complaintController.delete);
complaintRouter.get('/list/:id', _isAuthenticated.default, complaintController.getList);
var _default = complaintRouter;
exports.default = _default;
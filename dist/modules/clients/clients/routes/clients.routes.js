"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../shared/http/middlewares/isAuthenticated"));
var _ClientsController = _interopRequireDefault(require("../controllers/ClientsController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const clientsRouter = (0, _express.Router)();
const clientsController = new _ClientsController.default();
clientsRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    dataNascimento: _celebrate.Joi.date().required(),
    document: _celebrate.Joi.string().optional(),
    email: _celebrate.Joi.string().optional(),
    celphone: _celebrate.Joi.string().required(),
    second_celphone: _celebrate.Joi.string().optional(),
    instagram: _celebrate.Joi.string().optional(),
    address: _celebrate.Joi.string().required(),
    latitude: _celebrate.Joi.string().optional(),
    longitude: _celebrate.Joi.string().optional(),
    serviceType_id: _celebrate.Joi.number().required(),
    appointment: _celebrate.Joi.array().optional().items({
      type: _celebrate.Joi.number().required(),
      date_scheduled: _celebrate.Joi.string().required(),
      start_hour: _celebrate.Joi.string().required()
    }),
    diagnostic: _celebrate.Joi.object().optional().keys({
      diagnostic: _celebrate.Joi.string().required(),
      date: _celebrate.Joi.date().required()
    }),
    complaint: _celebrate.Joi.object().optional().keys({
      complaint: _celebrate.Joi.string().required(),
      date: _celebrate.Joi.date().required()
    }),
    hda: _celebrate.Joi.object().optional().keys({
      hda: _celebrate.Joi.string().required(),
      date: _celebrate.Joi.date().required()
    }),
    hpp: _celebrate.Joi.object().optional().keys({
      hpp: _celebrate.Joi.string().required(),
      date: _celebrate.Joi.date().required()
    }),
    funcionalDiagnosis: _celebrate.Joi.object().optional().keys({
      diagnostic: _celebrate.Joi.string().required(),
      date: _celebrate.Joi.date().required()
    }),
    physicalEval: _celebrate.Joi.object().optional().keys({
      evaluation: _celebrate.Joi.string().required(),
      date: _celebrate.Joi.date().required()
    }),
    respiratoryEval: _celebrate.Joi.object().optional().keys({
      evaluation: _celebrate.Joi.string().required(),
      date: _celebrate.Joi.date().required()
    }),
    objective: _celebrate.Joi.object().optional().keys({
      objective: _celebrate.Joi.string().required(),
      date: _celebrate.Joi.date().required()
    }),
    guideline: _celebrate.Joi.object().optional().keys({
      guideline: _celebrate.Joi.string().required(),
      date: _celebrate.Joi.date().required()
    })
  }
}), clientsController.create);
clientsRouter.patch('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    dataNascimento: _celebrate.Joi.date().required(),
    document: _celebrate.Joi.string().optional(),
    email: _celebrate.Joi.string().optional(),
    celphone: _celebrate.Joi.string().required(),
    second_celphone: _celebrate.Joi.string().optional(),
    instagram: _celebrate.Joi.string().optional(),
    address: _celebrate.Joi.string().required(),
    latitude: _celebrate.Joi.string().optional(),
    longitude: _celebrate.Joi.string().optional(),
    serviceType_id: _celebrate.Joi.number().required()
  }
}), clientsController.update);
clientsRouter.get('/:id', _isAuthenticated.default, clientsController.get);
clientsRouter.get('/user/all', _isAuthenticated.default, clientsController.getAll);
clientsRouter.delete('/:id', _isAuthenticated.default, clientsController.delete);

// clientsRouter.get('/infos/:id?:date', isAuthenticated, clientsController.getInfos);

clientsRouter.post('/infos', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    client_id: _celebrate.Joi.number().required(),
    date: _celebrate.Joi.date().required()
  }
}), clientsController.getInfos);
clientsRouter.post('/find', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: _celebrate.Joi.object({
    name: _celebrate.Joi.string().optional(),
    cpf: _celebrate.Joi.string().optional(),
    email: _celebrate.Joi.string().optional().email(),
    telefone: _celebrate.Joi.string().optional(),
    endereco: _celebrate.Joi.string().optional(),
    tipoServico: _celebrate.Joi.number().optional()
  }).or('name', 'cpf', 'email', 'telefone', 'endereco', 'tipoServico')
}), clientsController.getClientByName);
var _default = clientsRouter;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateEvolutionService = _interopRequireDefault(require("../services/CreateEvolutionService"));
var _DeleteEvolutionService = _interopRequireDefault(require("../services/DeleteEvolutionService"));
var _GetEvolutionService = _interopRequireDefault(require("../services/GetEvolutionService"));
var _ListEvolutionsService = _interopRequireDefault(require("../services/ListEvolutionsService"));
var _UpdateEvolutionService = _interopRequireDefault(require("../services/UpdateEvolutionService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class EvolutionsController {
  async create(request, response) {
    const {
      about,
      comments,
      date,
      client_id
    } = request.body;
    const {
      user_code
    } = request.user;
    const createDiagnostic = new _CreateEvolutionService.default();
    const clientDiagnostic = await createDiagnostic.execute({
      about,
      comments,
      date,
      client_id,
      user_code
    });
    return response.json(clientDiagnostic);
  }
  async get(request, response) {
    const {
      id,
      client_id
    } = request.params;
    const {
      user_code
    } = request.user;
    const getEvolution = new _GetEvolutionService.default();
    const getClientEvolution = await getEvolution.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(getClientEvolution);
  }
  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      about,
      comments,
      date,
      client_id
    } = request.body;
    const {
      user_code
    } = request.user;
    const updateEvolution = new _UpdateEvolutionService.default();
    const updateClientEvolution = await updateEvolution.execute({
      id: parseInt(id),
      about,
      comments,
      date,
      client_id,
      user_code
    });
    return response.json(updateClientEvolution);
  }
  async delete(request, response) {
    const {
      id,
      client_id
    } = request.params;
    const {
      user_code
    } = request.user;
    const deleteEvolution = new _DeleteEvolutionService.default();
    const deleteClientEvolution = await deleteEvolution.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(deleteClientEvolution);
  }
  async getList(request, response) {
    const {
      id
    } = request.params;
    const {
      user_code
    } = request.user;
    const getListEvolutions = new _ListEvolutionsService.default();
    const getListClientEvolution = await getListEvolutions.execute({
      client_id: parseInt(id),
      user_code
    });
    return response.json(getListClientEvolution);
  }
}
exports.default = EvolutionsController;
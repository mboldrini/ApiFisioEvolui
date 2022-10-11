"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateDiagnosticService = _interopRequireDefault(require("../services/CreateDiagnosticService"));
var _DeleteDiagnosticService = _interopRequireDefault(require("../services/DeleteDiagnosticService"));
var _GetDiagnosticService = _interopRequireDefault(require("../services/GetDiagnosticService"));
var _ListDiagnosticService = _interopRequireDefault(require("../services/ListDiagnosticService"));
var _UpdateDiagnosticService = _interopRequireDefault(require("../services/UpdateDiagnosticService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DiagnosticController {
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
    const createDiagnostic = new _CreateDiagnosticService.default();
    const clientDiagnostic = await createDiagnostic.execute({
      diagnostic: about,
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
    const getDiagnostic = new _GetDiagnosticService.default();
    const getClientDiagnostic = await getDiagnostic.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(getClientDiagnostic);
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
    const updateDiagnostic = new _UpdateDiagnosticService.default();
    const updateClientDiagnostic = await updateDiagnostic.execute({
      id: parseInt(id),
      diagnostic: about,
      comments,
      date,
      client_id,
      user_code
    });
    return response.json(updateClientDiagnostic);
  }
  async delete(request, response) {
    const {
      id,
      client_id
    } = request.params;
    const {
      user_code
    } = request.user;
    const deleteDiagnostic = new _DeleteDiagnosticService.default();
    const deleteClientDiagnostic = await deleteDiagnostic.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(deleteClientDiagnostic);
  }
  async getList(request, response) {
    const {
      id
    } = request.params;
    const {
      user_code
    } = request.user;
    const getListDiagnostic = new _ListDiagnosticService.default();
    const getListClientDiagnostic = await getListDiagnostic.execute({
      client_id: parseInt(id),
      user_code
    });
    return response.json(getListClientDiagnostic);
  }
}
exports.default = DiagnosticController;
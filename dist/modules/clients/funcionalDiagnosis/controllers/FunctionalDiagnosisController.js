"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateFunctionalDiagnosisService = _interopRequireDefault(require("../services/CreateFunctionalDiagnosisService"));
var _DeleteDiagnosticService = _interopRequireDefault(require("../services/DeleteDiagnosticService"));
var _GetFunctionalDiagnosisService = _interopRequireDefault(require("../services/GetFunctionalDiagnosisService"));
var _ListDiagnosticService = _interopRequireDefault(require("../services/ListDiagnosticService"));
var _UpdateFunctionalDiagnosisService = _interopRequireDefault(require("../services/UpdateFunctionalDiagnosisService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class FunctionalDiagnosisController {
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
    const createDiagnostic = new _CreateFunctionalDiagnosisService.default();
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
    const getDiagnostic = new _GetFunctionalDiagnosisService.default();
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
    const updateDiagnostic = new _UpdateFunctionalDiagnosisService.default();
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
exports.default = FunctionalDiagnosisController;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateRespiratoryEvalService = _interopRequireDefault(require("../services/CreateRespiratoryEvalService"));
var _DeleteRespiratoryEvalService = _interopRequireDefault(require("../services/DeleteRespiratoryEvalService"));
var _GetRespiratoryEvalService = _interopRequireDefault(require("../services/GetRespiratoryEvalService"));
var _ListRespiratoryEvalService = _interopRequireDefault(require("../services/ListRespiratoryEvalService"));
var _UpdateRespiratoryEvalService = _interopRequireDefault(require("../services/UpdateRespiratoryEvalService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ClientRespiratoryEvalController {
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
    const createRespEval = new _CreateRespiratoryEvalService.default();
    const newClientRespEval = await createRespEval.execute({
      evaluation: about,
      comments,
      date,
      client_id,
      user_code
    });
    return response.json(newClientRespEval);
  }
  async get(request, response) {
    const {
      id,
      client_id
    } = request.params;
    const {
      user_code
    } = request.user;
    const geEval = new _GetRespiratoryEvalService.default();
    const getClientRespiratoryEEval = await geEval.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(getClientRespiratoryEEval);
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
    const updateHDA = new _UpdateRespiratoryEvalService.default();
    const updateClientHda = await updateHDA.execute({
      id: parseInt(id),
      evaluation: about,
      comments,
      date,
      client_id,
      user_code
    });
    return response.json(updateClientHda);
  }
  async delete(request, response) {
    const {
      id,
      client_id
    } = request.params;
    const {
      user_code
    } = request.user;
    const deleteEval = new _DeleteRespiratoryEvalService.default();
    const deleteClientEval = await deleteEval.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(deleteClientEval);
  }
  async getList(request, response) {
    const {
      id
    } = request.params;
    const {
      user_code
    } = request.user;
    const getListPEval = new _ListRespiratoryEvalService.default();
    const getListClientPEval = await getListPEval.execute({
      client_id: parseInt(id),
      user_code
    });
    return response.json(getListClientPEval);
  }
}
exports.default = ClientRespiratoryEvalController;
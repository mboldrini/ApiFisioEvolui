"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreatePhysicalEvalService = _interopRequireDefault(require("../services/CreatePhysicalEvalService"));
var _DeletePhysicalEvalService = _interopRequireDefault(require("../services/DeletePhysicalEvalService"));
var _GetPhysicalEvalService = _interopRequireDefault(require("../services/GetPhysicalEvalService"));
var _ListPhysicalEvalService = _interopRequireDefault(require("../services/ListPhysicalEvalService"));
var _UpdatePhysicalEvalService = _interopRequireDefault(require("../services/UpdatePhysicalEvalService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ClientPhysicalEvalController {
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
    const createPEval = new _CreatePhysicalEvalService.default();
    const newClientEval = await createPEval.execute({
      evaluation: about,
      comments,
      date,
      client_id,
      user_code
    });
    return response.json(newClientEval);
  }
  async get(request, response) {
    const {
      id,
      client_id
    } = request.params;
    const {
      user_code
    } = request.user;
    const geEval = new _GetPhysicalEvalService.default();
    const getClientPhysicalEEval = await geEval.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(getClientPhysicalEEval);
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
    const updateHDA = new _UpdatePhysicalEvalService.default();
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
    const deleteEval = new _DeletePhysicalEvalService.default();
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
    const getListPEval = new _ListPhysicalEvalService.default();
    const getListClientPEval = await getListPEval.execute({
      client_id: parseInt(id),
      user_code
    });
    return response.json(getListClientPEval);
  }
}
exports.default = ClientPhysicalEvalController;
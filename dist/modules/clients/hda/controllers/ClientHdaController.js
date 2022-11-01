"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateHDAService = _interopRequireDefault(require("../services/CreateHDAService"));
var _DeleteHDAService = _interopRequireDefault(require("../services/DeleteHDAService"));
var _GetHDAService = _interopRequireDefault(require("../services/GetHDAService"));
var _ListHDAService = _interopRequireDefault(require("../services/ListHDAService"));
var _UpdateHDAService = _interopRequireDefault(require("../services/UpdateHDAService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ClientHdaController {
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
    const createHda = new _CreateHDAService.default();
    const newClientHda = await createHda.execute({
      hda: about,
      comments,
      date,
      client_id,
      user_code
    });
    return response.json(newClientHda);
  }
  async get(request, response) {
    const {
      id,
      client_id
    } = request.params;
    const {
      user_code
    } = request.user;
    const getHda = new _GetHDAService.default();
    const getClientHda = await getHda.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(getClientHda);
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
    const updateHDA = new _UpdateHDAService.default();
    const updateClientHda = await updateHDA.execute({
      id: parseInt(id),
      hda: about,
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
    const deleteHDA = new _DeleteHDAService.default();
    const deleteClientHDA = await deleteHDA.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(deleteClientHDA);
  }
  async getList(request, response) {
    const {
      id
    } = request.params;
    const {
      user_code
    } = request.user;
    const getListHDA = new _ListHDAService.default();
    const getListClientHDA = await getListHDA.execute({
      client_id: parseInt(id),
      user_code
    });
    return response.json(getListClientHDA);
  }
}
exports.default = ClientHdaController;
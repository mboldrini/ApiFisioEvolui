"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateHPPService = _interopRequireDefault(require("../services/CreateHPPService"));
var _DeleteHppService = _interopRequireDefault(require("../services/DeleteHppService"));
var _GetHppService = _interopRequireDefault(require("../services/GetHppService"));
var _ListHPPService = _interopRequireDefault(require("../services/ListHPPService"));
var _UpdateHPPService = _interopRequireDefault(require("../services/UpdateHPPService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ClientHppController {
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
    const createHda = new _CreateHPPService.default();
    const newClientHpp = await createHda.execute({
      hpp: about,
      comments,
      date,
      client_id,
      user_code
    });
    return response.json(newClientHpp);
  }
  async get(request, response) {
    const {
      id,
      client_id
    } = request.params;
    const {
      user_code
    } = request.user;
    const getHpp = new _GetHppService.default();
    const getClientHpp = await getHpp.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(getClientHpp);
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
    const updateHDA = new _UpdateHPPService.default();
    const updateClientHda = await updateHDA.execute({
      id: parseInt(id),
      hpp: about,
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
    const deleteHPP = new _DeleteHppService.default();
    const deleteClientHPP = await deleteHPP.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(deleteClientHPP);
  }
  async getList(request, response) {
    const {
      id
    } = request.params;
    const {
      user_code
    } = request.user;
    const getListHPP = new _ListHPPService.default();
    const getListClientHPP = await getListHPP.execute({
      client_id: parseInt(id),
      user_code
    });
    return response.json(getListClientHPP);
  }
}
exports.default = ClientHppController;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateObjectiveService = _interopRequireDefault(require("../services/CreateObjectiveService"));
var _DeleteObjectiveService = _interopRequireDefault(require("../services/DeleteObjectiveService"));
var _GetObjectiveService = _interopRequireDefault(require("../services/GetObjectiveService"));
var _ListObjectiveService = _interopRequireDefault(require("../services/ListObjectiveService"));
var _UpdateObjectiveService = _interopRequireDefault(require("../services/UpdateObjectiveService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ClientObjectiveController {
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
    const createObjective = new _CreateObjectiveService.default();
    const newClientObjc = await createObjective.execute({
      objectives: about,
      comments,
      date,
      client_id,
      user_code
    });
    return response.json(newClientObjc);
  }
  async get(request, response) {
    const {
      id,
      client_id
    } = request.params;
    const {
      user_code
    } = request.user;
    const getHpp = new _GetObjectiveService.default();
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
    const updateObjective = new _UpdateObjectiveService.default();
    const updateClientObj = await updateObjective.execute({
      id: parseInt(id),
      objectives: about,
      comments,
      date,
      client_id,
      user_code
    });
    return response.json(updateClientObj);
  }
  async delete(request, response) {
    const {
      id,
      client_id
    } = request.params;
    const {
      user_code
    } = request.user;
    const deleteObjective = new _DeleteObjectiveService.default();
    const deleteClientObj = await deleteObjective.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(deleteClientObj);
  }
  async getList(request, response) {
    const {
      id
    } = request.params;
    const {
      user_code
    } = request.user;
    const getListObjectives = new _ListObjectiveService.default();
    const getListClientObjectives = await getListObjectives.execute({
      client_id: parseInt(id),
      user_code
    });
    return response.json(getListClientObjectives);
  }
}
exports.default = ClientObjectiveController;
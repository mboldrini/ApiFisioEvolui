"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateGuidelineService = _interopRequireDefault(require("../services/CreateGuidelineService"));
var _DeleteGuidelineService = _interopRequireDefault(require("../services/DeleteGuidelineService"));
var _GetGuidelineService = _interopRequireDefault(require("../services/GetGuidelineService"));
var _ListGuidelineService = _interopRequireDefault(require("../services/ListGuidelineService"));
var _UpdateGuidelineService = _interopRequireDefault(require("../services/UpdateGuidelineService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GuidelinesController {
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
    const createGuideline = new _CreateGuidelineService.default();
    const clientGuideline = await createGuideline.execute({
      guideline: about,
      comments,
      date,
      client_id,
      user_code
    });
    return response.json(clientGuideline);
  }
  async get(request, response) {
    const {
      id,
      client_id
    } = request.params;
    const {
      user_code
    } = request.user;
    const getGuideline = new _GetGuidelineService.default();
    const getClientGuideline = await getGuideline.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(getClientGuideline);
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
    const updateGuideline = new _UpdateGuidelineService.default();
    const updateClientGuideline = await updateGuideline.execute({
      id: parseInt(id),
      guideline: about,
      comments,
      date,
      client_id,
      user_code
    });
    return response.json(updateClientGuideline);
  }
  async delete(request, response) {
    const {
      id,
      client_id
    } = request.params;
    const {
      user_code
    } = request.user;
    const deleteGuideline = new _DeleteGuidelineService.default();
    const deleteClientGuideline = await deleteGuideline.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(deleteClientGuideline);
  }
  async getList(request, response) {
    const {
      id
    } = request.params;
    const {
      user_code
    } = request.user;
    const getListGuideline = new _ListGuidelineService.default();
    const getListClientGuideline = await getListGuideline.execute({
      client_id: parseInt(id),
      user_code
    });
    return response.json(getListClientGuideline);
  }
}
exports.default = GuidelinesController;
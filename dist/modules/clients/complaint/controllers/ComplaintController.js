"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateComplaintService = _interopRequireDefault(require("../services/CreateComplaintService"));
var _DeleteDiagnosticService = _interopRequireDefault(require("../services/DeleteDiagnosticService"));
var _GetComplaintService = _interopRequireDefault(require("../services/GetComplaintService"));
var _ListDiagnosticService = _interopRequireDefault(require("../services/ListDiagnosticService"));
var _UpdateComplaintService = _interopRequireDefault(require("../services/UpdateComplaintService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ComplaintController {
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
    const complaintDiagnostic = new _CreateComplaintService.default();
    const clientComplaintDiagnostic = await complaintDiagnostic.execute({
      complaint: about,
      comments,
      date,
      client_id,
      user_code
    });
    return response.json(clientComplaintDiagnostic);
  }
  async get(request, response) {
    const {
      id,
      client_id
    } = request.params;
    const {
      user_code
    } = request.user;
    const getComplaint = new _GetComplaintService.default();
    const getClientComplaint = await getComplaint.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(getClientComplaint);
  }
  async update(request, response) {
    const {
      id,
      client_id
    } = request.params;
    const {
      about,
      comments,
      date
    } = request.body;
    const {
      user_code
    } = request.user;
    const updateComplaint = new _UpdateComplaintService.default();
    const updateClientComplaint = await updateComplaint.execute({
      id: parseInt(id),
      complaint: about,
      comments,
      date,
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(updateClientComplaint);
  }
  async delete(request, response) {
    const {
      id,
      client_id
    } = request.params;
    const {
      user_code
    } = request.user;
    const deleteComplaint = new _DeleteDiagnosticService.default();
    const deleteClientComplaint = await deleteComplaint.execute({
      id: parseInt(id),
      client_id: parseInt(client_id),
      user_code
    });
    return response.json(deleteClientComplaint);
  }
  async getList(request, response) {
    const {
      id
    } = request.params;
    const {
      user_code
    } = request.user;
    const getListComplaint = new _ListDiagnosticService.default();
    const getListClientComplaint = await getListComplaint.execute({
      client_id: parseInt(id),
      user_code
    });
    return response.json(getListClientComplaint);
  }
}
exports.default = ComplaintController;
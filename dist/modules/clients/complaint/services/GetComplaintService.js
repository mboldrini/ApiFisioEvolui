"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Complaint = require("./../typeorm/repositories/Complaint");
var _UsersRepository = require("../../../users/users/typeorm/repositories/UsersRepository");
var _ClientsRepository = require("../../clients/typeorm/repositories/ClientsRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetComplaintService {
  async execute({
    id,
    client_id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const complaintRepo = (0, _typeorm.getCustomRepository)(_Complaint.ComplaintRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default('Esse usuário não existe', 404);
    const clientExist = await clientsRepo.findOne({
      id: client_id,
      user_id: userExists.user_id
    });
    if (!clientExist) throw new _AppError.default('Esse cliente não existe', 404);
    const complaintExist = await complaintRepo.findOne({
      id,
      client_id: clientExist.id
    });
    if (!complaintExist) throw new _AppError.default('Essa queixa não existe!', 404);
    const newComplaint = {
      about: complaintExist.complaint,
      comments: complaintExist.comments,
      date: complaintExist.date,
      client_id: complaintExist.client_id,
      id: complaintExist.id,
      created_at: complaintExist.created_at,
      updated_at: complaintExist.updated_at
    };
    return newComplaint;
  }
}
var _default = GetComplaintService;
exports.default = _default;
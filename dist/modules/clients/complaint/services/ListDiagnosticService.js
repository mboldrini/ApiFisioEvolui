"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Complaint = require("./../typeorm/repositories/Complaint");
var _UsersRepository = require("./../../../users/users/typeorm/repositories/UsersRepository");
var _ClientsRepository = require("./../../clients/typeorm/repositories/ClientsRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ListComplaintService {
  async execute({
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
    const complaintExist = await complaintRepo.find({
      client_id: clientExist.id
    });
    if (!complaintExist) throw new _AppError.default('Esse diagnostico não existe!', 404);
    const newComplaintList = complaintExist.map(complaint => ({
      about: complaint.complaint,
      comments: complaint.comments,
      date: complaint.date,
      client_id: complaint.client_id,
      id: complaint.id,
      created_at: complaint.created_at,
      updated_at: complaint.updated_at
    }));
    return newComplaintList;
  }
}
var _default = ListComplaintService;
exports.default = _default;
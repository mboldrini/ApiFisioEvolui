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
class UpdateComplaintService {
  async execute({
    id,
    complaint,
    comments,
    date,
    client_id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const complaintsRepo = (0, _typeorm.getCustomRepository)(_Complaint.ComplaintRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default("User don't exist", 404);
    const clientExist = await clientsRepo.findOne({
      id: client_id,
      user_id: userExists.user_id
    });
    if (!clientExist) throw new _AppError.default("This client don't exist", 404);
    const complaintExist = await complaintsRepo.findOne({
      id,
      client_id: clientExist.id
    });
    if (!complaintExist) throw new _AppError.default('Essa queixa não existe!', 404);
    complaintExist.complaint = complaint;
    if (comments) {
      complaintExist.comments = comments;
    }
    if (date) {
      complaintExist.date = date;
    }
    await complaintsRepo.save(complaintExist);
    return complaintExist;
  }
}
var _default = UpdateComplaintService;
exports.default = _default;
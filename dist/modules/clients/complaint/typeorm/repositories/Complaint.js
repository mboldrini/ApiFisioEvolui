"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ComplaintRepository = void 0;
var _typeorm = require("typeorm");
var _Complaint = _interopRequireDefault(require("../entities/Complaint"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ComplaintRepository = (_dec = (0, _typeorm.EntityRepository)(_Complaint.default), _dec(_class = class ComplaintRepository extends _typeorm.Repository {
  async findOrderBy({
    user_id,
    client_id
  }) {
    const complaint = await this.find({
      where: {
        user_id,
        client_id
      },
      order: {
        date: 'ASC'
      },
      take: 3
    });
    return complaint;
  }
}) || _class);
exports.ComplaintRepository = ComplaintRepository;
var _default = ComplaintRepository;
exports.default = _default;
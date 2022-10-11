"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ClientPhysicalEvalRepository = void 0;
var _typeorm = require("typeorm");
var _PhysicalEvaluation = _interopRequireDefault(require("../entities/PhysicalEvaluation"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ClientPhysicalEvalRepository = (_dec = (0, _typeorm.EntityRepository)(_PhysicalEvaluation.default), _dec(_class = class ClientPhysicalEvalRepository extends _typeorm.Repository {
  async findOrderBy({
    user_id,
    client_id
  }) {
    const diagnostic = await this.find({
      where: {
        user_id,
        client_id
      },
      order: {
        date: 'ASC'
      },
      take: 3
    });
    return diagnostic;
  }
}) || _class);
exports.ClientPhysicalEvalRepository = ClientPhysicalEvalRepository;
var _default = ClientPhysicalEvalRepository;
exports.default = _default;
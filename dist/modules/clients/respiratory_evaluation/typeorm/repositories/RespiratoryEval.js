"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ClientRespiratoryEvalRepository = void 0;
var _typeorm = require("typeorm");
var _RespiratoryEvatuation = _interopRequireDefault(require("../entities/RespiratoryEvatuation"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ClientRespiratoryEvalRepository = (_dec = (0, _typeorm.EntityRepository)(_RespiratoryEvatuation.default), _dec(_class = class ClientRespiratoryEvalRepository extends _typeorm.Repository {
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
exports.ClientRespiratoryEvalRepository = ClientRespiratoryEvalRepository;
var _default = ClientRespiratoryEvalRepository;
exports.default = _default;
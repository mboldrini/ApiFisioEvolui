"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ClientFunctionalDiagnosisRepository = void 0;
var _typeorm = require("typeorm");
var _FuncionalDiagnosis = _interopRequireDefault(require("../entities/FuncionalDiagnosis"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ClientFunctionalDiagnosisRepository = (_dec = (0, _typeorm.EntityRepository)(_FuncionalDiagnosis.default), _dec(_class = class ClientFunctionalDiagnosisRepository extends _typeorm.Repository {
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
exports.ClientFunctionalDiagnosisRepository = ClientFunctionalDiagnosisRepository;
var _default = ClientFunctionalDiagnosisRepository;
exports.default = _default;
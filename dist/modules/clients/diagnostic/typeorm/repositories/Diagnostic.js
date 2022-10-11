"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DiagnosticRepository = void 0;
var _typeorm = require("typeorm");
var _Diagnostic = _interopRequireDefault(require("../entities/Diagnostic"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let DiagnosticRepository = (_dec = (0, _typeorm.EntityRepository)(_Diagnostic.default), _dec(_class = class DiagnosticRepository extends _typeorm.Repository {
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
exports.DiagnosticRepository = DiagnosticRepository;
var _default = DiagnosticRepository;
exports.default = _default;
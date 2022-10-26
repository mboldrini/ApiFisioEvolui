"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VersionamentoRepository = void 0;
var _typeorm = require("typeorm");
var _VersionamentoTypes = _interopRequireDefault(require("../entities/VersionamentoTypes"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let VersionamentoRepository = (_dec = (0, _typeorm.EntityRepository)(_VersionamentoTypes.default), _dec(_class = class VersionamentoRepository extends _typeorm.Repository {
  async findLastVersion() {
    const payment = await this.findOne({
      where: {
        liberado: true
      },
      order: {
        created_at: 'DESC',
        versao: 'ASC',
        id: 'DESC'
      }
    });
    return payment;
  }
}) || _class);
exports.VersionamentoRepository = VersionamentoRepository;
var _default = VersionamentoRepository;
exports.default = _default;
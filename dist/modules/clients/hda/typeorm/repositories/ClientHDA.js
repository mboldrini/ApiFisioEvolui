"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ClientHDARepository = void 0;
var _typeorm = require("typeorm");
var _ClientHDA = _interopRequireDefault(require("../entities/ClientHDA"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ClientHDARepository = (_dec = (0, _typeorm.EntityRepository)(_ClientHDA.default), _dec(_class = class ClientHDARepository extends _typeorm.Repository {
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
exports.ClientHDARepository = ClientHDARepository;
var _default = ClientHDARepository;
exports.default = _default;
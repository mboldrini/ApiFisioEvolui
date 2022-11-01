"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ClientHPPRepository = void 0;
var _typeorm = require("typeorm");
var _ClientHPP = _interopRequireDefault(require("../entities/ClientHPP"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ClientHPPRepository = (_dec = (0, _typeorm.EntityRepository)(_ClientHPP.default), _dec(_class = class ClientHPPRepository extends _typeorm.Repository {
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
exports.ClientHPPRepository = ClientHPPRepository;
var _default = ClientHPPRepository;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ClientObjectivesRepository = void 0;
var _typeorm = require("typeorm");
var _ClientObjectives = _interopRequireDefault(require("../entities/ClientObjectives"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ClientObjectivesRepository = (_dec = (0, _typeorm.EntityRepository)(_ClientObjectives.default), _dec(_class = class ClientObjectivesRepository extends _typeorm.Repository {
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
exports.ClientObjectivesRepository = ClientObjectivesRepository;
var _default = ClientObjectivesRepository;
exports.default = _default;
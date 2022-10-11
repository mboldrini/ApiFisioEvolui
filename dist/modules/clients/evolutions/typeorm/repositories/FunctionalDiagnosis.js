"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ClientEvolutionsRepository = void 0;
var _typeorm = require("typeorm");
var _Evolutions = _interopRequireDefault(require("../entities/Evolutions"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ClientEvolutionsRepository = (_dec = (0, _typeorm.EntityRepository)(_Evolutions.default), _dec(_class = class ClientEvolutionsRepository extends _typeorm.Repository {
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
exports.ClientEvolutionsRepository = ClientEvolutionsRepository;
var _default = ClientEvolutionsRepository;
exports.default = _default;
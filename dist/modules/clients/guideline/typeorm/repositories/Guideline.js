"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ClientGuidelineRepository = void 0;
var _typeorm = require("typeorm");
var _Guideline = _interopRequireDefault(require("../entities/Guideline"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ClientGuidelineRepository = (_dec = (0, _typeorm.EntityRepository)(_Guideline.default), _dec(_class = class ClientGuidelineRepository extends _typeorm.Repository {
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
exports.ClientGuidelineRepository = ClientGuidelineRepository;
var _default = ClientGuidelineRepository;
exports.default = _default;
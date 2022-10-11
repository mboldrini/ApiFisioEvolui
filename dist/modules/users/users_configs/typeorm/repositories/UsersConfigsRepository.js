"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UsersConfigsRepository = void 0;
var _typeorm = require("typeorm");
var _UsersConfigs = _interopRequireDefault(require("../entities/UsersConfigs"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let UsersConfigsRepository = (_dec = (0, _typeorm.EntityRepository)(_UsersConfigs.default), _dec(_class = class UsersConfigsRepository extends _typeorm.Repository {}) || _class);
exports.UsersConfigsRepository = UsersConfigsRepository;
var _default = UsersConfigsRepository;
exports.default = _default;
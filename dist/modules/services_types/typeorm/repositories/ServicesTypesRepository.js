"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ServicesTypesRepository = void 0;
var _typeorm = require("typeorm");
var _ServicesTypes = _interopRequireDefault(require("../entities/ServicesTypes"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ServicesTypesRepository = (_dec = (0, _typeorm.EntityRepository)(_ServicesTypes.default), _dec(_class = class ServicesTypesRepository extends _typeorm.Repository {}) || _class);
exports.ServicesTypesRepository = ServicesTypesRepository;
var _default = ServicesTypesRepository;
exports.default = _default;
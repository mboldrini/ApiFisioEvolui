"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UsersAddressRepository = void 0;
var _typeorm = require("typeorm");
var _UserAddress = _interopRequireDefault(require("../entities/UserAddress"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let UsersAddressRepository = (_dec = (0, _typeorm.EntityRepository)(_UserAddress.default), _dec(_class = class UsersAddressRepository extends _typeorm.Repository {}) || _class);
exports.UsersAddressRepository = UsersAddressRepository;
var _default = UsersAddressRepository;
exports.default = _default;
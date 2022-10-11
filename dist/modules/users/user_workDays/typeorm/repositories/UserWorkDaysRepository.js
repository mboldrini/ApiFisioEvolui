"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UserWorkDaysRepository = void 0;
var _typeorm = require("typeorm");
var _UserWorkDays = _interopRequireDefault(require("../entities/UserWorkDays"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let UserWorkDaysRepository = (_dec = (0, _typeorm.EntityRepository)(_UserWorkDays.default), _dec(_class = class UserWorkDaysRepository extends _typeorm.Repository {}) || _class);
exports.UserWorkDaysRepository = UserWorkDaysRepository;
var _default = UserWorkDaysRepository;
exports.default = _default;
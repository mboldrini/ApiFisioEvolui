"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ServicePaymentRepository = void 0;
var _typeorm = require("typeorm");
var _ServicePayment = _interopRequireDefault(require("../entities/ServicePayment"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ServicePaymentRepository = (_dec = (0, _typeorm.EntityRepository)(_ServicePayment.default), _dec(_class = class ServicePaymentRepository extends _typeorm.Repository {}) || _class);
exports.ServicePaymentRepository = ServicePaymentRepository;
var _default = ServicePaymentRepository;
exports.default = _default;
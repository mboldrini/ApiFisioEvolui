"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PaymentMethodRepository = void 0;
var _typeorm = require("typeorm");
var _PaymentMethod = _interopRequireDefault(require("../entities/PaymentMethod"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let PaymentMethodRepository = (_dec = (0, _typeorm.EntityRepository)(_PaymentMethod.default), _dec(_class = class PaymentMethodRepository extends _typeorm.Repository {}) || _class);
exports.PaymentMethodRepository = PaymentMethodRepository;
var _default = PaymentMethodRepository;
exports.default = _default;
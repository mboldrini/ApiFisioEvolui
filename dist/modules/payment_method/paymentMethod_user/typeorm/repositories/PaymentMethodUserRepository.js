"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PaymentMethodUserRepository = void 0;
var _typeorm = require("typeorm");
var _PaymentMethodUser = _interopRequireDefault(require("../entities/PaymentMethodUser"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let PaymentMethodUserRepository = (_dec = (0, _typeorm.EntityRepository)(_PaymentMethodUser.default), _dec(_class = class PaymentMethodUserRepository extends _typeorm.Repository {
  // public async findById(id: number): Promise<PaymentMethodUser | undefined> {
  // 	const payment = await this.findOne({
  // 		where: {
  // 			id: id,
  // 		},
  // 	});
  // 	return payment;
  // }
}) || _class);
exports.PaymentMethodUserRepository = PaymentMethodUserRepository;
var _default = PaymentMethodUserRepository;
exports.default = _default;
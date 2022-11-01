"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Appointments = _interopRequireDefault(require("../../../appointments/typeorm/entities/Appointments"));
var _ServicesTypes = _interopRequireDefault(require("../../../services_types/typeorm/entities/ServicesTypes"));
var _User = _interopRequireDefault(require("../../../users/users/typeorm/entities/User"));
var _typeorm = require("typeorm");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
let ServicePayment = (_dec = (0, _typeorm.Entity)('service_payment'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('increment'), _dec3 = Reflect.metadata("design:type", Number), _dec4 = (0, _typeorm.OneToOne)(() => _Appointments.default), _dec5 = (0, _typeorm.JoinColumn)({
  name: 'appointment_id'
}), _dec6 = (0, _typeorm.Column)({
  name: 'appointment_id'
}), _dec7 = Reflect.metadata("design:type", Number), _dec8 = (0, _typeorm.OneToOne)(() => _User.default), _dec9 = (0, _typeorm.JoinColumn)({
  name: 'user_id'
}), _dec10 = (0, _typeorm.Column)({
  name: 'user_id'
}), _dec11 = Reflect.metadata("design:type", Number), _dec12 = (0, _typeorm.Column)(), _dec13 = Reflect.metadata("design:type", Number), _dec14 = (0, _typeorm.Column)(), _dec15 = Reflect.metadata("design:type", String), _dec16 = (0, _typeorm.Column)(), _dec17 = Reflect.metadata("design:type", Number), _dec18 = (0, _typeorm.Column)(), _dec19 = Reflect.metadata("design:type", Boolean), _dec20 = (0, _typeorm.OneToOne)(() => _ServicesTypes.default), _dec21 = (0, _typeorm.JoinColumn)({
  name: 'serviceType_id'
}), _dec22 = (0, _typeorm.Column)({
  name: 'serviceType_id'
}), _dec23 = Reflect.metadata("design:type", Number), _dec24 = (0, _typeorm.CreateDateColumn)({
  type: 'timestamp',
  default: new Date().toLocaleString()
}), _dec25 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec26 = (0, _typeorm.UpdateDateColumn)({
  type: 'timestamp',
  default: new Date().toLocaleString()
}), _dec27 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = class ServicePayment {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);
    _initializerDefineProperty(this, "appointment_id", _descriptor2, this);
    _initializerDefineProperty(this, "user_id", _descriptor3, this);
    _initializerDefineProperty(this, "price", _descriptor4, this);
    _initializerDefineProperty(this, "comments", _descriptor5, this);
    _initializerDefineProperty(this, "status", _descriptor6, this);
    _initializerDefineProperty(this, "scheduled", _descriptor7, this);
    _initializerDefineProperty(this, "serviceType_id", _descriptor8, this);
    _initializerDefineProperty(this, "created_at", _descriptor9, this);
    _initializerDefineProperty(this, "updated_at", _descriptor10, this);
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "appointment_id", [_dec4, _dec5, _dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "user_id", [_dec8, _dec9, _dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "price", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "comments", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "status", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "scheduled", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "serviceType_id", [_dec20, _dec21, _dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var _default = ServicePayment;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _User = _interopRequireDefault(require("../../../../users/users/typeorm/entities/User"));
var _Clients = _interopRequireDefault(require("../../../clients/typeorm/entities/Clients"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
let ClientFunctionalDiagnosis = (_dec = (0, _typeorm.Entity)('clients_funcionalDiagnosis'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('increment'), _dec3 = Reflect.metadata("design:type", Number), _dec4 = (0, _typeorm.Column)(), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)(), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeorm.Column)(), _dec9 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec10 = (0, _typeorm.OneToOne)(() => _Clients.default), _dec11 = (0, _typeorm.JoinColumn)({
  name: 'client_id'
}), _dec12 = (0, _typeorm.Column)(), _dec13 = Reflect.metadata("design:type", Number), _dec14 = (0, _typeorm.OneToOne)(() => _User.default), _dec15 = (0, _typeorm.JoinColumn)({
  name: 'user_id'
}), _dec16 = (0, _typeorm.Column)(), _dec17 = Reflect.metadata("design:type", Number), _dec18 = (0, _typeorm.CreateDateColumn)({
  type: 'timestamp'
}), _dec19 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec20 = (0, _typeorm.UpdateDateColumn)({
  type: 'timestamp'
}), _dec21 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = class ClientFunctionalDiagnosis {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);
    _initializerDefineProperty(this, "diagnosis", _descriptor2, this);
    _initializerDefineProperty(this, "comments", _descriptor3, this);
    _initializerDefineProperty(this, "date", _descriptor4, this);
    _initializerDefineProperty(this, "client_id", _descriptor5, this);
    _initializerDefineProperty(this, "user_id", _descriptor6, this);
    _initializerDefineProperty(this, "created_at", _descriptor7, this);
    _initializerDefineProperty(this, "updated_at", _descriptor8, this);
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "diagnosis", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "comments", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "date", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "client_id", [_dec10, _dec11, _dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "user_id", [_dec14, _dec15, _dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var _default = ClientFunctionalDiagnosis;
exports.default = _default;
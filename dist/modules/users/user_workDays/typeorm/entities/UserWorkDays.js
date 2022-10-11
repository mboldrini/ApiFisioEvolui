"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _User = _interopRequireDefault(require("../../../users/typeorm/entities/User"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
let UserWorkDays = (_dec = (0, _typeorm.Entity)('user_workDays'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('increment'), _dec3 = Reflect.metadata("design:type", Number), _dec4 = (0, _typeorm.OneToOne)(() => _User.default), _dec5 = (0, _typeorm.JoinColumn)({
  name: 'user_id'
}), _dec6 = Reflect.metadata("design:type", Number), _dec7 = (0, _typeorm.Column)({
  default: false
}), _dec8 = Reflect.metadata("design:type", Boolean), _dec9 = (0, _typeorm.Column)({
  default: 'T08:00:00.000-03:00'
}), _dec10 = Reflect.metadata("design:type", String), _dec11 = (0, _typeorm.Column)({
  default: 'T08:01:00.000-03:00'
}), _dec12 = Reflect.metadata("design:type", String), _dec13 = (0, _typeorm.Column)({
  default: true
}), _dec14 = Reflect.metadata("design:type", Boolean), _dec15 = (0, _typeorm.Column)({
  default: 'T08:00:00.000-03:00'
}), _dec16 = Reflect.metadata("design:type", String), _dec17 = (0, _typeorm.Column)({
  default: 'T18:00:00.000-03:00'
}), _dec18 = Reflect.metadata("design:type", String), _dec19 = (0, _typeorm.Column)({
  default: true
}), _dec20 = Reflect.metadata("design:type", Boolean), _dec21 = (0, _typeorm.Column)({
  default: 'T08:00:00.000-03:00'
}), _dec22 = Reflect.metadata("design:type", String), _dec23 = (0, _typeorm.Column)({
  default: 'T18:00:00.000-03:00'
}), _dec24 = Reflect.metadata("design:type", String), _dec25 = (0, _typeorm.Column)({
  default: true
}), _dec26 = Reflect.metadata("design:type", Boolean), _dec27 = (0, _typeorm.Column)({
  default: 'T08:00:00.000-03:00'
}), _dec28 = Reflect.metadata("design:type", String), _dec29 = (0, _typeorm.Column)({
  default: 'T18:00:00.000-03:00'
}), _dec30 = Reflect.metadata("design:type", String), _dec31 = (0, _typeorm.Column)({
  default: true
}), _dec32 = Reflect.metadata("design:type", Boolean), _dec33 = (0, _typeorm.Column)({
  default: 'T08:00:00.000-03:00'
}), _dec34 = Reflect.metadata("design:type", String), _dec35 = (0, _typeorm.Column)({
  default: 'T18:00:00.000-03:00'
}), _dec36 = Reflect.metadata("design:type", String), _dec37 = (0, _typeorm.Column)({
  default: true
}), _dec38 = Reflect.metadata("design:type", Boolean), _dec39 = (0, _typeorm.Column)({
  default: 'T08:00:00.000-03:00'
}), _dec40 = Reflect.metadata("design:type", String), _dec41 = (0, _typeorm.Column)({
  default: 'T18:00:00.000-03:00'
}), _dec42 = Reflect.metadata("design:type", String), _dec43 = (0, _typeorm.Column)({
  default: false
}), _dec44 = Reflect.metadata("design:type", Boolean), _dec45 = (0, _typeorm.Column)({
  default: 'T08:00:00.000-03:00'
}), _dec46 = Reflect.metadata("design:type", String), _dec47 = (0, _typeorm.Column)({
  default: 'T12:00:00.000-03:00'
}), _dec48 = Reflect.metadata("design:type", String), _dec49 = (0, _typeorm.CreateDateColumn)({
  type: 'timestamp'
}), _dec50 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec51 = (0, _typeorm.UpdateDateColumn)({
  type: 'timestamp'
}), _dec52 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = class UserWorkDays {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);
    _initializerDefineProperty(this, "user_id", _descriptor2, this);
    _initializerDefineProperty(this, "sunday", _descriptor3, this);
    _initializerDefineProperty(this, "sunday_startHour", _descriptor4, this);
    _initializerDefineProperty(this, "sunday_endHour", _descriptor5, this);
    _initializerDefineProperty(this, "monday", _descriptor6, this);
    _initializerDefineProperty(this, "monday_startHour", _descriptor7, this);
    _initializerDefineProperty(this, "monday_endHour", _descriptor8, this);
    _initializerDefineProperty(this, "tuesday", _descriptor9, this);
    _initializerDefineProperty(this, "tuesday_startHour", _descriptor10, this);
    _initializerDefineProperty(this, "tuesday_endHour", _descriptor11, this);
    _initializerDefineProperty(this, "wednesday", _descriptor12, this);
    _initializerDefineProperty(this, "wednesday_startHour", _descriptor13, this);
    _initializerDefineProperty(this, "wednesday_endHour", _descriptor14, this);
    _initializerDefineProperty(this, "thursday", _descriptor15, this);
    _initializerDefineProperty(this, "thursday_startHour", _descriptor16, this);
    _initializerDefineProperty(this, "thursday_endHour", _descriptor17, this);
    _initializerDefineProperty(this, "friday", _descriptor18, this);
    _initializerDefineProperty(this, "friday_startHour", _descriptor19, this);
    _initializerDefineProperty(this, "friday_endHour", _descriptor20, this);
    _initializerDefineProperty(this, "saturday", _descriptor21, this);
    _initializerDefineProperty(this, "saturday_startHour", _descriptor22, this);
    _initializerDefineProperty(this, "saturday_endHour", _descriptor23, this);
    _initializerDefineProperty(this, "created_at", _descriptor24, this);
    _initializerDefineProperty(this, "updated_at", _descriptor25, this);
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "user_id", [_dec4, _dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sunday", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sunday_startHour", [_dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sunday_endHour", [_dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "monday", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "monday_startHour", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "monday_endHour", [_dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "tuesday", [_dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "tuesday_startHour", [_dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "tuesday_endHour", [_dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "wednesday", [_dec25, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "wednesday_startHour", [_dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "wednesday_endHour", [_dec29, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "thursday", [_dec31, _dec32], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "thursday_startHour", [_dec33, _dec34], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "thursday_endHour", [_dec35, _dec36], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "friday", [_dec37, _dec38], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "friday_startHour", [_dec39, _dec40], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "friday_endHour", [_dec41, _dec42], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "saturday", [_dec43, _dec44], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "saturday_startHour", [_dec45, _dec46], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "saturday_endHour", [_dec47, _dec48], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec49, _dec50], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec51, _dec52], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var _default = UserWorkDays;
exports.default = _default;
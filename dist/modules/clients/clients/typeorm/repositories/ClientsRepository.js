"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ClientsRepository = void 0;
var _typeorm = require("typeorm");
var _Clients = _interopRequireDefault(require("../entities/Clients"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ClientsRepository = (_dec = (0, _typeorm.EntityRepository)(_Clients.default), _dec(_class = class ClientsRepository extends _typeorm.Repository {
  async findByName({
    user_id,
    nome
  }) {
    const payment = await this.find({
      where: {
        name: (0, _typeorm.Like)(`%${nome}%`),
        user_id: user_id,
        enabled: true
      }
    });
    return payment;
  }
  async findByCPF({
    user_id,
    cpf
  }) {
    const payment = await this.find({
      where: {
        document: (0, _typeorm.Like)(`%${cpf}%`),
        user_id: user_id,
        enabled: true
      }
    });
    return payment;
  }
  async findByEmail({
    user_id,
    email
  }) {
    const payment = await this.find({
      where: {
        email: (0, _typeorm.Like)(`%${email}%`),
        user_id: user_id,
        enabled: true
      }
    });
    return payment;
  }
  async findByTelefone({
    user_id,
    celphone
  }) {
    const payment = await this.find({
      where: {
        celphone: (0, _typeorm.Like)(`%${celphone}%`),
        user_id: user_id,
        enabled: true
      }
    });
    return payment;
  }
  async findByAddress({
    user_id,
    address
  }) {
    const payment = await this.find({
      where: {
        address: (0, _typeorm.Like)(`%${address}%`),
        user_id: user_id,
        enabled: true
      }
    });
    return payment;
  }
  async findByServiceType({
    user_id,
    serviceType_id
  }) {
    const payment = await this.find({
      where: {
        serviceType_id: serviceType_id,
        user_id: user_id,
        enabled: true
      }
    });
    return payment;
  }
}) || _class);
exports.ClientsRepository = ClientsRepository;
var _default = ClientsRepository;
exports.default = _default;
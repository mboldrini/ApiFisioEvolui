"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AppointmentsRepository = void 0;
var _typeorm = require("typeorm");
var _Appointments = _interopRequireDefault(require("../entities/Appointments"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let AppointmentsRepository = (_dec = (0, _typeorm.EntityRepository)(_Appointments.default), _dec(_class = class AppointmentsRepository extends _typeorm.Repository {
  async findOrderBy({
    user_id,
    client_id,
    start_date,
    end_date
  }) {
    const diagnostic = await this.find({
      where: {
        client_id,
        user_id,
        date_scheduled: (0, _typeorm.Between)(start_date, end_date)
      },
      order: {
        date_scheduled: 'ASC',
        start_hour: 'ASC'
      }
    });
    return diagnostic;
  }
  async findAllMonth({
    user_id,
    client_id,
    start_date,
    end_date
  }) {
    const diagnostic = await this.find({
      where: {
        client_id,
        user_id,
        date_scheduled: (0, _typeorm.Between)(start_date, end_date),
        scheduled: true
      },
      order: {
        date_scheduled: 'ASC',
        start_hour: 'ASC'
      }
    });
    return diagnostic;
  }
}) || _class);
exports.AppointmentsRepository = AppointmentsRepository;
var _default = AppointmentsRepository;
exports.default = _default;
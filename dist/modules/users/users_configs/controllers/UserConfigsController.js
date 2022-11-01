"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateUserConfigsService = _interopRequireDefault(require("../services/CreateUserConfigsService"));
var _GetUserConfigsService = _interopRequireDefault(require("../services/GetUserConfigsService"));
var _UpdateUserConfigsService = _interopRequireDefault(require("../services/UpdateUserConfigsService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UserConfigsController {
  async create(request, response) {
    const {
      allow_retroactiveDate,
      allow_notifications,
      schedule_startDay,
      user_premium,
      premium_type,
      premium_until
    } = request.body;
    const {
      user_code
    } = request.user;
    const createUserConfigs = new _CreateUserConfigsService.default();
    const userConfigs = await createUserConfigs.execute({
      user_code,
      allow_retroactiveDate,
      allow_notifications,
      schedule_startDay,
      user_premium,
      premium_type,
      premium_until
    });
    return response.json({
      message: 'ok'
    });
  }
  async update(request, response) {
    const {
      allow_retroactiveDate,
      allow_notifications,
      schedule_startDay,
      user_premium,
      premium_type,
      premium_until
    } = request.body;
    const {
      user_code
    } = request.user;
    const updateUserConfigs = new _UpdateUserConfigsService.default();
    const updateConfigs = await updateUserConfigs.execute({
      user_code,
      allow_retroactiveDate,
      allow_notifications,
      schedule_startDay,
      user_premium,
      premium_type,
      premium_until
    });
    return response.json(updateConfigs);
  }
  async get(request, response) {
    const {
      user_code
    } = request.user;
    const userConfigs = new _GetUserConfigsService.default();
    const configs = await userConfigs.execute({
      user_code
    });
    return response.json(configs);
  }
}
exports.default = UserConfigsController;
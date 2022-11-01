"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateUserWorkDaysService = _interopRequireDefault(require("../services/CreateUserWorkDaysService"));
var _GetIserWorkDaysService = _interopRequireDefault(require("../services/GetIserWorkDaysService"));
var _UpdateUserWorkDaysService = _interopRequireDefault(require("../services/UpdateUserWorkDaysService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UserWorkDaysController {
  async create(request, response) {
    const {
      user_code
    } = request.user;
    const createUserInfos = new _CreateUserWorkDaysService.default();
    const userWorkDay = await createUserInfos.execute({
      user_code
    });
    return response.json(userWorkDay);
  }
  async update(request, response) {
    const {
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday
    } = request.body;
    const {
      user_code
    } = request.user;
    const updateUserInfos = new _UpdateUserWorkDaysService.default();
    const userWorkDay = await updateUserInfos.execute({
      user_code,
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday
    });
    return response.json(userWorkDay);
  }
  async get(request, response) {
    const {
      user_code
    } = request.user;
    const createUserInfos = new _GetIserWorkDaysService.default();
    const userWorkDay = await createUserInfos.execute({
      user_code
    });
    return response.json(userWorkDay);
  }
}
exports.default = UserWorkDaysController;
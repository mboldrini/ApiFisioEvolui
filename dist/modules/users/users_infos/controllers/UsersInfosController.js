"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateUserInfosService = _interopRequireDefault(require("../services/CreateUserInfosService"));
var _GetUserInfosService = _interopRequireDefault(require("../services/GetUserInfosService"));
var _GetUserStatisticsService = _interopRequireDefault(require("../services/GetUserStatisticsService"));
var _UpdateUserInfosService = _interopRequireDefault(require("../services/UpdateUserInfosService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UsersInfosController {
  async create(request, response) {
    const {
      description,
      professional_mail,
      celphone,
      second_celphone,
      website,
      instagram,
      twitter,
      tiktok
    } = request.body;
    const {
      user_code
    } = request.user;
    const createUserInfos = new _CreateUserInfosService.default();
    const userAddress = await createUserInfos.execute({
      user_code,
      description,
      professional_mail,
      celphone,
      second_celphone,
      website,
      instagram,
      twitter,
      tiktok
    });
    return response.json({
      messsage: 'ok'
    });
  }
  async update(request, response) {
    const {
      description,
      professional_mail,
      celphone,
      second_celphone,
      website,
      instagram,
      twitter,
      tiktok
    } = request.body;
    const {
      user_code
    } = request.user;
    const updateUserInfos = new _UpdateUserInfosService.default();
    const userInfos = await updateUserInfos.execute({
      user_code,
      description,
      professional_mail,
      celphone,
      second_celphone,
      website,
      instagram,
      twitter,
      tiktok
    });
    return response.json({
      messsage: 'ok'
    });
  }
  async get(request, response) {
    const {
      user_code
    } = request.user;
    const getUserInfos = new _GetUserInfosService.default();
    const userInfos = await getUserInfos.execute({
      user_code
    });
    return response.json(userInfos);
  }
  async getStatistics(request, response) {
    const {
      user_code
    } = request.user;
    const getUserStatistic = new _GetUserStatisticsService.default();
    const statistic = await getUserStatistic.execute({
      user_code
    });
    return response.json(statistic);
  }
}
exports.default = UsersInfosController;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _magicCode = require("../DTO/magicCode");
var _CreateSessionsService = _interopRequireDefault(require("../services/CreateSessionsService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class SessionsController {
  async create(request, response) {
    const {
      magic_code,
      email,
      user_code
    } = request.body;
    if (magic_code != _magicCode.MAGIC_CODE) throw new _AppError.default('You Shall not pass!', 404);
    const createSession = new _CreateSessionsService.default();
    const user = await createSession.execute({
      email,
      user_code,
      magic_code
    });
    return response.json(user);
  }
}
exports.default = SessionsController;
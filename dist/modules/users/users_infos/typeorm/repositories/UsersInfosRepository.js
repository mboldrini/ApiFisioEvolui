"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UsersInfosRepository = void 0;
var _typeorm = require("typeorm");
var _UsersInfos = _interopRequireDefault(require("../entities/UsersInfos"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let UsersInfosRepository = (_dec = (0, _typeorm.EntityRepository)(_UsersInfos.default), _dec(_class = class UsersInfosRepository extends _typeorm.Repository {
  // public async findById(user_id: string): Promise<UsersInfos | undefined> {
  // 	const user = await this.findOne({
  // 		where: {
  // 			user_id,
  // 		},
  // 	});
  // 	return user;
  // }
}) || _class);
exports.UsersInfosRepository = UsersInfosRepository;
var _default = UsersInfosRepository;
exports.default = _default;
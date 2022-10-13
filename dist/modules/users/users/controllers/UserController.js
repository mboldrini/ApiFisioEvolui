"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _magicCode = require("../DTO/magicCode");
var _CreateUserService = _interopRequireDefault(require("../services/CreateUserService"));
var _ShowUserService = _interopRequireDefault(require("../services/ShowUserService"));
var _UserAlreadyExistService = _interopRequireDefault(require("../services/UserAlreadyExistService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UsersController {
  async show(request, response) {
    const {
      user_code
    } = request.user;
    const showUser = new _ShowUserService.default();
    const user = await showUser.execute({
      user_code
    });
    return response.json(user);
  }
  async exist(request, response) {
    const {
      magic_code,
      email
    } = request.body;
    const {
      user_code
    } = request.user;
    const showUser = new _UserAlreadyExistService.default();
    const user = await showUser.execute({
      user_code,
      email,
      magic_code
    });
    return response.json(user);
  }
  async create(request, response) {
    const {
      magic_code,
      user_code,
      name,
      family_name,
      given_name,
      picture,
      email,
      address,
      infos
    } = request.body;
    if (magic_code != _magicCode.MAGIC_CODE) throw new _AppError.default('You Shall not pass!', 404);
    const createUser = new _CreateUserService.default();
    const user = await createUser.execute({
      user_code,
      name,
      family_name,
      given_name,
      picture,
      email
    });

    // const createUserConfigs = new CreateUserConfigsService();
    // const userConfigs = await createUserConfigs.execute({
    // 	user_code: user_code,
    // });

    // if (address) {
    // 	const createUserAddress = new CreateUserAddressService();
    // 	const addRess = await createUserAddress.execute({
    // 		user_code: user_code,
    // 		address: address.address,
    // 		number: address.number,
    // 		city: address.city,
    // 		district: address.district,
    // 		state: address.state,
    // 		country: address.country,
    // 	});
    // }

    // if (infos) {
    // 	const createUserInfos = new CreateUsersInfosService();
    // 	const addInfos = await createUserInfos.execute({
    // 		user_code: user_code,
    // 		description: infos.description,
    // 		professional_mail: infos.professional_mail,
    // 		celphone: infos.celphone,
    // 		second_celphone: infos.second_celphone,
    // 		website: infos.website,
    // 		instagram: infos.instagram,
    // 		twitter: infos.twitter,
    // 		tiktok: infos.tiktok,
    // 	});
    // }

    // const createUserWorkDays = new CreateUserWorkDaysService();
    // const userWorkDays = await createUserWorkDays.execute({
    // 	user_code,
    // });

    return response.json(user);
  }
}
exports.default = UsersController;
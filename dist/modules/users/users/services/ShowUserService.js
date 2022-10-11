"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _PaymentMethodUserRepository = require("./../../../payment_method/paymentMethod_user/typeorm/repositories/PaymentMethodUserRepository");
var _ServicesTypesRepository = require("./../../../services_types/typeorm/repositories/ServicesTypesRepository");
var _UsersInfosRepository = require("./../../users_infos/typeorm/repositories/UsersInfosRepository");
var _UsersConfigsRepository = require("./../../users_configs/typeorm/repositories/UsersConfigsRepository");
var _UsersAddressRepository = require("./../../users_address/typeorm/repositories/UsersAddressRepository");
var _DTO = require("../../../../shared/DTO");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _UsersRepository = require("../typeorm/repositories/UsersRepository");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ShowUserService {
  async execute({
    user_code
  }) {
    const userRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const userAddressRepo = (0, _typeorm.getCustomRepository)(_UsersAddressRepository.UsersAddressRepository);
    const userConfigsRepo = (0, _typeorm.getCustomRepository)(_UsersConfigsRepository.UsersConfigsRepository);
    const userInfosRepo = (0, _typeorm.getCustomRepository)(_UsersInfosRepository.UsersInfosRepository);
    const serviceTypesRepo = (0, _typeorm.getCustomRepository)(_ServicesTypesRepository.ServicesTypesRepository);
    const paymentTypeRepo = (0, _typeorm.getCustomRepository)(_PaymentMethodUserRepository.PaymentMethodUserRepository);
    const user = await userRepository.findOne({
      user_code
    });
    if (!user) throw new _AppError.default("This user don't exist");
    const userAddress = await userAddressRepo.findOne({
      user_id: user.user_id
    });
    const userAddressMap = {
      address: userAddress === null || userAddress === void 0 ? void 0 : userAddress.address,
      number: userAddress === null || userAddress === void 0 ? void 0 : userAddress.number,
      city: userAddress === null || userAddress === void 0 ? void 0 : userAddress.city,
      district: userAddress === null || userAddress === void 0 ? void 0 : userAddress.district,
      state: userAddress === null || userAddress === void 0 ? void 0 : userAddress.state,
      country: userAddress === null || userAddress === void 0 ? void 0 : userAddress.country
    };
    const userConfigs = await userConfigsRepo.findOne({
      user_id: user.user_id
    });
    const userConfigsMap = {
      allow_retroactiveDate: userConfigs === null || userConfigs === void 0 ? void 0 : userConfigs.allow_retroactiveDate,
      allow_notifications: userConfigs === null || userConfigs === void 0 ? void 0 : userConfigs.allow_notifications,
      schedule_startDay: userConfigs === null || userConfigs === void 0 ? void 0 : userConfigs.schedule_startDay,
      user_premium: userConfigs === null || userConfigs === void 0 ? void 0 : userConfigs.user_premium,
      premium_type: userConfigs === null || userConfigs === void 0 ? void 0 : userConfigs.premium_type,
      premium_until: userConfigs === null || userConfigs === void 0 ? void 0 : userConfigs.premium_until.toLocaleString(_DTO.TIMEZONE_LANGUAGE)
    };
    const userInfosExist = await userInfosRepo.findOne({
      user_id: user.user_id
    });
    const userInfosMap = {
      description: userInfosExist === null || userInfosExist === void 0 ? void 0 : userInfosExist.description,
      professional_mail: userInfosExist === null || userInfosExist === void 0 ? void 0 : userInfosExist.professional_mail,
      celphone: userInfosExist === null || userInfosExist === void 0 ? void 0 : userInfosExist.celphone,
      second_celphone: userInfosExist === null || userInfosExist === void 0 ? void 0 : userInfosExist.second_celphone,
      website: userInfosExist === null || userInfosExist === void 0 ? void 0 : userInfosExist.website,
      instagram: userInfosExist === null || userInfosExist === void 0 ? void 0 : userInfosExist.instagram,
      twitter: userInfosExist === null || userInfosExist === void 0 ? void 0 : userInfosExist.twitter,
      tiktok: userInfosExist === null || userInfosExist === void 0 ? void 0 : userInfosExist.tiktok
    };
    const servicesTypeList = await serviceTypesRepo.find({
      user_id: user.user_id
    });
    let newServicesTypeList = servicesTypeList.map(service => ({
      id: service.id,
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      created_at: service.created_at,
      updated_at: service.updated_at
    }));
    const paymentMethodList = await paymentTypeRepo.find({
      user_id: user.user_id
    });
    let mapUser = {
      user_code: user.user_code,
      name: user.name,
      family_name: user.family_name,
      given_name: user.given_name,
      picture: user.picture,
      email: user.email,
      enabled: user.enabled,
      created_at: user.created_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE, _DTO.TIMEZONE_LOCALE),
      address: userAddressMap,
      configs: userConfigsMap,
      personal_infos: userInfosMap,
      serviceType: newServicesTypeList,
      paymentMethod: paymentMethodList
    };
    return mapUser;
  }
}
var _default = ShowUserService;
exports.default = _default;
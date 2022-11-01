"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateVersionamentoService = _interopRequireDefault(require("../services/CreateVersionamentoService"));
var _DeleteVersionamentoService = _interopRequireDefault(require("../services/DeleteVersionamentoService"));
var _GetLastVersionService = _interopRequireDefault(require("../services/GetLastVersionService"));
var _ListaVersoesService = _interopRequireDefault(require("../services/ListaVersoesService"));
var _UpdateVersionamentoService = _interopRequireDefault(require("../services/UpdateVersionamentoService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class VersionamentoController {
  async create(request, response) {
    const {
      versao,
      novidades,
      data_publicacao
    } = request.body;
    const {
      user_code
    } = request.user;
    const createVersion = new _CreateVersionamentoService.default();
    const version = await createVersion.execute({
      user_code,
      versao,
      novidades,
      data_publicacao
    });
    return response.json(version);
  }
  async getLastVersion(request, response) {
    const {
      user_code
    } = request.user;
    const lastVersion = new _GetLastVersionService.default();
    const version = await lastVersion.execute({
      user_code
    });
    return response.json(version);
  }
  async update(request, response) {
    const {
      id,
      versao,
      novidades,
      data_publicacao,
      liberado
    } = request.body;
    const {
      user_code
    } = request.user;
    const lastVersion = new _UpdateVersionamentoService.default();
    const version = await lastVersion.execute({
      id: parseInt(id),
      user_code,
      versao,
      novidades,
      data_publicacao,
      liberado
    });
    return response.json(version);
  }
  async lista(request, response) {
    const {
      user_code
    } = request.user;
    const lastVersion = new _ListaVersoesService.default();
    const version = await lastVersion.execute({
      user_code
    });
    return response.json(version);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    const {
      user_code
    } = request.user;
    const lastVersion = new _DeleteVersionamentoService.default();
    const version = await lastVersion.execute({
      user_code,
      id: parseInt(id)
    });
    return response.json(version);
  }
}
exports.default = VersionamentoController;
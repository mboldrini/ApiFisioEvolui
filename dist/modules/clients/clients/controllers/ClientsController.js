"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateMultipleAppointmentServiceCopy = _interopRequireDefault(require("../../../appointments/services/CreateMultipleAppointmentService copy"));
var _CreateComplaintService = _interopRequireDefault(require("../../complaint/services/CreateComplaintService"));
var _CreateDiagnosticService = _interopRequireDefault(require("../../diagnostic/services/CreateDiagnosticService"));
var _CreateFunctionalDiagnosisService = _interopRequireDefault(require("../../funcionalDiagnosis/services/CreateFunctionalDiagnosisService"));
var _CreateGuidelineService = _interopRequireDefault(require("../../guideline/services/CreateGuidelineService"));
var _CreateHDAService = _interopRequireDefault(require("../../hda/services/CreateHDAService"));
var _CreateHPPService = _interopRequireDefault(require("../../hpp/services/CreateHPPService"));
var _CreateObjectiveService = _interopRequireDefault(require("../../objectives_goals/services/CreateObjectiveService"));
var _CreatePhysicalEvalService = _interopRequireDefault(require("../../physical_evaluation/services/CreatePhysicalEvalService"));
var _CreateRespiratoryEvalService = _interopRequireDefault(require("../../respiratory_evaluation/services/CreateRespiratoryEvalService"));
var _ClientFindService = _interopRequireDefault(require("../services/ClientFindService"));
var _CreateClientService = _interopRequireDefault(require("../services/CreateClientService"));
var _DeleteClientService = _interopRequireDefault(require("../services/DeleteClientService"));
var _GetAllClientsInfosService = _interopRequireDefault(require("../services/GetAllClientsInfosService"));
var _GetAllClientsService = _interopRequireDefault(require("../services/GetAllClientsService"));
var _GetClientService = _interopRequireDefault(require("../services/GetClientService.ts"));
var _UpdateClientService = _interopRequireDefault(require("../services/UpdateClientService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ClientsController {
  async create(request, response) {
    const {
      name,
      dataNascimento,
      document,
      email,
      celphone,
      second_celphone,
      instagram,
      address,
      serviceType_id,
      latitude,
      longitude,
      diagnostic,
      complaint,
      hda,
      hpp,
      funcionalDiagnosis,
      physicalEval,
      respiratoryEval,
      objective,
      guideline,
      appointment
    } = request.body;
    const {
      user_code
    } = request.user;
    const createClient = new _CreateClientService.default();
    const newClient = await createClient.execute({
      user_code,
      name,
      dataNascimento,
      document,
      email,
      celphone,
      second_celphone,
      instagram,
      serviceType_id,
      address,
      latitude,
      longitude
    });
    let newDiagnosis;
    if (diagnostic) {
      const createDiagnosis = new _CreateDiagnosticService.default();
      newDiagnosis = await createDiagnosis.execute({
        diagnostic: diagnostic.diagnostic,
        comments: '',
        date: diagnostic.date,
        client_id: newClient.id,
        user_code: user_code
      });
    }
    let newComplaint;
    if (complaint) {
      const createComplaint = new _CreateComplaintService.default();
      newComplaint = await createComplaint.execute({
        complaint: complaint.complaint,
        date: complaint.date,
        comments: '',
        client_id: newClient.id,
        user_code: user_code
      });
    }
    let newHda;
    if (hda) {
      const createHda = new _CreateHDAService.default();
      newHda = await createHda.execute({
        hda: hda.hda,
        date: hda.date,
        comments: '',
        client_id: newClient.id,
        user_code: user_code
      });
    }
    let newHpp;
    if (hpp) {
      const createHpp = new _CreateHPPService.default();
      newHpp = await createHpp.execute({
        hpp: hpp.hpp,
        date: hpp.date,
        comments: '',
        client_id: newClient.id,
        user_code: user_code
      });
    }
    let newFunctDiagnosis;
    if (funcionalDiagnosis) {
      const createFuncDiagnos = new _CreateFunctionalDiagnosisService.default();
      newFunctDiagnosis = await createFuncDiagnos.execute({
        diagnostic: funcionalDiagnosis.diagnostic,
        date: funcionalDiagnosis.date,
        comments: '',
        client_id: newClient.id,
        user_code: user_code
      });
    }
    let newPhysicalEval;
    if (physicalEval) {
      const createPhysicalEval = new _CreatePhysicalEvalService.default();
      newPhysicalEval = await createPhysicalEval.execute({
        evaluation: physicalEval.evaluation,
        date: physicalEval.date,
        comments: '',
        client_id: newClient.id,
        user_code: user_code
      });
    }
    let newRespiratoryEval;
    if (respiratoryEval) {
      const createRespiratoryEval = new _CreateRespiratoryEvalService.default();
      newRespiratoryEval = await createRespiratoryEval.execute({
        evaluation: respiratoryEval.evaluation,
        date: respiratoryEval.date,
        comments: '',
        client_id: newClient.id,
        user_code: user_code
      });
    }
    let newObjective;
    if (objective) {
      const createObjective = new _CreateObjectiveService.default();
      newObjective = await createObjective.execute({
        objectives: objective.objective,
        date: objective.date,
        comments: '',
        client_id: newClient.id,
        user_code: user_code
      });
    }
    let newGuideline;
    if (guideline) {
      const createGuideline = new _CreateGuidelineService.default();
      newGuideline = await createGuideline.execute({
        guideline: guideline.guideline,
        date: guideline.date,
        comments: '',
        client_id: newClient.id,
        user_code: user_code
      });
    }
    let newAppointments;
    if (appointment) {
      const createAppointment = new _CreateMultipleAppointmentServiceCopy.default();
      newAppointments = await createAppointment.execute({
        user_code: user_code,
        client_id: newClient.id,
        serviceType_id: serviceType_id,
        appointments: appointment
      });
    }
    const retorno = {
      client: newClient,
      diagnostic: newDiagnosis,
      complaint: newComplaint,
      hda: newHda,
      hpp: newHpp,
      functionalDiagnosis: newFunctDiagnosis,
      physicalEval: newPhysicalEval,
      respiratoryEval: newRespiratoryEval,
      objective: newObjective,
      guideline: newGuideline,
      appointment: newAppointments
    };
    return response.json(retorno);
  }
  async update(request, response) {
    const {
      name,
      dataNascimento,
      document,
      email,
      celphone,
      second_celphone,
      instagram,
      serviceType_id,
      address,
      latitude,
      longitude
    } = request.body;
    const {
      id
    } = request.params;
    const {
      user_code
    } = request.user;
    const client_id = parseInt(id);
    const updateClient = new _UpdateClientService.default();
    const updatedClient = await updateClient.execute({
      id: client_id,
      user_code,
      name,
      dataNascimento,
      document,
      email,
      celphone,
      second_celphone,
      instagram,
      serviceType_id,
      address,
      latitude,
      longitude
    });
    return response.json({
      messsage: 'ok'
    });
  }
  async get(request, response) {
    const {
      id
    } = request.params;
    const {
      user_code
    } = request.user;
    const client_id = parseInt(id);
    const getclient = new _GetClientService.default();
    const client = await getclient.execute({
      id: client_id,
      user_code
    });
    return response.json(client);
  }
  async getAll(request, response) {
    const {
      user_code
    } = request.user;
    const getclient = new _GetAllClientsService.default();
    const clientList = await getclient.execute({
      user_code
    });
    return response.json(clientList);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    const {
      user_code
    } = request.user;
    const client_id = parseInt(id);
    const getclient = new _DeleteClientService.default();
    const client = await getclient.execute({
      id: client_id,
      user_code
    });
    return response.json({
      message: 'ok'
    });
  }
  async getInfos(request, response) {
    const {
      client_id,
      date
    } = request.body;
    const {
      user_code
    } = request.user;
    const client_idD = parseInt(client_id);
    const getclient = new _GetAllClientsInfosService.default();
    const client = await getclient.execute({
      client_id: client_idD,
      date,
      user_code
    });
    return response.json(client);
  }
  async getClientByName(request, response) {
    const {
      name,
      cpf,
      email,
      telefone,
      endereco,
      tipoServico
    } = request.body;
    const {
      user_code
    } = request.user;
    const getclient = new _ClientFindService.default();
    const client = await getclient.execute({
      user_code,
      name,
      cpf,
      email,
      telefone,
      endereco,
      tipoServico: parseInt(tipoServico)
    });
    return response.json(client);
  }
}
exports.default = ClientsController;
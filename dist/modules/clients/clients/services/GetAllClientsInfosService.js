"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ServicesTypesRepository = require("./../../../services_types/typeorm/repositories/ServicesTypesRepository");
var _RespiratoryEval = require("../../respiratory_evaluation/typeorm/repositories/RespiratoryEval");
var _PhysicalEval = require("../../physical_evaluation/typeorm/repositories/PhysicalEval");
var _ClientObjectives = require("../../objectives_goals/typeorm/repositories/ClientObjectives");
var _ClientHPP = require("../../hpp/typeorm/repositories/ClientHPP");
var _ClientHDA = require("../../hda/typeorm/repositories/ClientHDA");
var _Guideline = require("../../guideline/typeorm/repositories/Guideline");
var _Diagnostic = require("../../diagnostic/typeorm/repositories/Diagnostic");
var _Complaint = require("../../complaint/typeorm/repositories/Complaint");
var _ClientsRepository = require("../typeorm/repositories/ClientsRepository");
var _AppointmentsRepository = require("../../../appointments/typeorm/repositories/AppointmentsRepository");
var _UsersRepository = require("../../../users/users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _dateFns = require("date-fns");
var _FunctionalDiagnosis = _interopRequireDefault(require("../../funcionalDiagnosis/typeorm/repositories/FunctionalDiagnosis"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function GetDate(date, type) {
  let dt = new Date(date);
  if (type === 'start') {
    return (0, _dateFns.startOfMonth)(dt);
  } else {
    return (0, _dateFns.endOfMonth)(dt);
  }
}
class GetAllClientsInfosService {
  async execute({
    user_code,
    client_id,
    date
  }) {
    const userRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const complaintRepo = (0, _typeorm.getCustomRepository)(_Complaint.ComplaintRepository);
    const diagnosticRepo = (0, _typeorm.getCustomRepository)(_Diagnostic.DiagnosticRepository);
    const funcionalDiagRepo = (0, _typeorm.getCustomRepository)(_FunctionalDiagnosis.default);
    const guidelineRepo = (0, _typeorm.getCustomRepository)(_Guideline.ClientGuidelineRepository);
    const hdaRepo = (0, _typeorm.getCustomRepository)(_ClientHDA.ClientHDARepository);
    const hppRepo = (0, _typeorm.getCustomRepository)(_ClientHPP.ClientHPPRepository);
    const objectivesRepo = (0, _typeorm.getCustomRepository)(_ClientObjectives.ClientObjectivesRepository);
    const physicalEvalRepo = (0, _typeorm.getCustomRepository)(_PhysicalEval.ClientPhysicalEvalRepository);
    const respiratoryEvalRepo = (0, _typeorm.getCustomRepository)(_RespiratoryEval.ClientRespiratoryEvalRepository);
    const appointmentRepo = (0, _typeorm.getCustomRepository)(_AppointmentsRepository.AppointmentsRepository);
    const serviceTypeRepo = (0, _typeorm.getCustomRepository)(_ServicesTypesRepository.ServicesTypesRepository);
    const startDate = GetDate(date, 'start');
    const endDate = GetDate(date, 'end');
    const userExist = await userRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default('Esse usuário não existe');
    const clientExist = await clientsRepo.findOne({
      user_id: userExist === null || userExist === void 0 ? void 0 : userExist.user_id,
      id: client_id,
      enabled: true
    });
    if (!clientExist) throw new _AppError.default('Esse cliente não existe!');

    /// Reclamações
    const complaintList = await complaintRepo.findOrderBy({
      client_id: clientExist.id,
      user_id: userExist.user_id
    });
    const newComplaintList = complaintList.map(compl => ({
      id: compl.id,
      about: compl.complaint,
      comments: compl.comments,
      date: compl.date,
      client_id: compl.client_id,
      created_at: compl.created_at,
      updated_at: compl.updated_at
    }));

    /// Diagnóstico Inicial
    const diagnosticList = await diagnosticRepo.findOrderBy({
      client_id: clientExist.id,
      user_id: userExist.user_id
    });
    const newDiagnosticList = diagnosticList.map(diagnostic => ({
      id: diagnostic.id,
      about: diagnostic.diagnostic,
      comments: diagnostic.comments,
      date: diagnostic.date,
      client_id: diagnostic.client_id,
      created_at: diagnostic.created_at,
      updated_at: diagnostic.updated_at
    }));

    /// Diagnostico Funcional
    const funcionalList = await funcionalDiagRepo.findOrderBy({
      client_id: clientExist.id,
      user_id: userExist.user_id
    });
    const newFuncionalList = funcionalList.map(funcional => ({
      id: funcional.id,
      about: funcional.diagnosis,
      comments: funcional.comments,
      date: funcional.date,
      client_id: funcional.client_id,
      created_at: funcional.created_at,
      updated_at: funcional.updated_at
    }));

    /// Observações
    const guidelineList = await guidelineRepo.findOrderBy({
      client_id: clientExist.id,
      user_id: userExist.user_id
    });
    const newGuidelineList = guidelineList.map(guideline => ({
      id: guideline.id,
      about: guideline.guideline,
      comments: guideline.comments,
      date: guideline.date,
      client_id: guideline.client_id,
      created_at: guideline.created_at,
      updated_at: guideline.updated_at
    }));

    /// HDA - Histórico de Doença Atual
    const hdaList = await hdaRepo.findOrderBy({
      client_id: clientExist.id,
      user_id: userExist.user_id
    });
    const newHdaList = hdaList.map(hda => ({
      id: hda.id,
      about: hda.hda,
      comments: hda.comments,
      date: hda.date,
      client_id: hda.client_id,
      created_at: hda.created_at,
      updated_at: hda.updated_at
    }));

    /// HPP - Histórico de Doença Pregressa
    const hppList = await hppRepo.findOrderBy({
      client_id: clientExist.id,
      user_id: userExist.user_id
    });
    const newHppList = hppList.map(hppList => ({
      id: hppList.id,
      about: hppList.hpp,
      comments: hppList.comments,
      date: hppList.date,
      client_id: hppList.client_id,
      created_at: hppList.created_at,
      updated_at: hppList.updated_at
    }));

    /// Objetivos e metas
    const objectivesList = await objectivesRepo.findOrderBy({
      client_id: clientExist.id,
      user_id: userExist.user_id
    });
    const newObjectivesList = objectivesList.map(objectivesList => ({
      id: objectivesList.id,
      about: objectivesList.objectives,
      comments: objectivesList.comments,
      date: objectivesList.date,
      client_id: objectivesList.client_id,
      created_at: objectivesList.created_at,
      updated_at: objectivesList.updated_at
    }));

    /// Avaliação Física
    const physicalList = await physicalEvalRepo.findOrderBy({
      client_id: clientExist.id,
      user_id: userExist.user_id
    });
    const newPhysicalList = physicalList.map(physical => ({
      id: physical.id,
      about: physical.evaluation,
      comments: physical.comments,
      date: physical.date,
      client_id: physical.client_id,
      created_at: physical.created_at,
      updated_at: physical.updated_at
    }));

    /// Avaliação Respiratória
    const respiratoryList = await respiratoryEvalRepo.findOrderBy({
      client_id: clientExist.id,
      user_id: userExist.user_id
    });
    const newRespiratoryList = respiratoryList.map(respiratory => ({
      id: respiratory.id,
      about: respiratory.evaluation,
      comments: respiratory.comments,
      date: respiratory.date,
      client_id: respiratory.client_id,
      created_at: respiratory.created_at,
      updated_at: respiratory.updated_at
    }));
    const servicesTypesList = await serviceTypeRepo.find({
      user_id: userExist.user_id
    });
    const appointmentList = await appointmentRepo.findOrderBy({
      client_id: clientExist.id,
      user_id: userExist.user_id,
      start_date: startDate,
      end_date: endDate
    });
    let newAppointmentList = appointmentList.map(appointment => ({
      id: appointment.id,
      status: appointment.status,
      type: appointment.type,
      date_scheduled: appointment.date_scheduled,
      start_hour: appointment.start_hour,
      end_hour: appointment.end_hour,
      duration: appointment.duration,
      client_id: appointment.client_id,
      serviceType_id: appointment.serviceType_id,
      serviceType_name: servicesTypesList.filter(service => {
        if (service.id == appointment.serviceType_id) return service.description;
      }).map(service => {
        return service.description;
      })[0]
    }));
    const infos = {
      clinicalDiagnostic: newDiagnosticList,
      complaints: newComplaintList,
      hda: newHdaList,
      hpp: newHppList,
      physicalEvaluation: newPhysicalList,
      respiratoryEvaluation: newRespiratoryList,
      functionalDiagnostic: newFuncionalList,
      objectives: newObjectivesList,
      evolution: 'PRECISO DESENVOLVER',
      guideline: newGuidelineList,
      appointment: newAppointmentList
    };
    return infos;
  }
}
var _default = GetAllClientsInfosService;
exports.default = _default;
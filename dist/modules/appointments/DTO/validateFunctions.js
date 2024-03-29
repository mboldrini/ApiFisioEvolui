"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAllPossibleAppointmentsHours = GetAllPossibleAppointmentsHours;
exports.GetTimeStamp = GetTimeStamp;
exports.GetWorkDayInfos = GetWorkDayInfos;
exports.SetEndHour = SetEndHour;
exports.VerifyAllDaySchedules = VerifyAllDaySchedules;
var _dateFns = require("date-fns");
function SetEndHour(startHour, duration) {
  if (startHour.length == 5) {
    startHour = startHour + ':00';
  }
  const [sHour, sMinute, sSecond] = startHour.split(':');
  const [hora, minuto, segundo] = duration.split(':');
  let dateHour = new Date(1995, 6, 1, parseInt(sHour), parseInt(sMinute), parseInt(sSecond));
  dateHour = (0, _dateFns.addHours)(dateHour, parseInt(hora));
  dateHour = (0, _dateFns.addMinutes)(dateHour, parseInt(minuto));
  dateHour = (0, _dateFns.addSeconds)(dateHour, parseInt(segundo));
  return (0, _dateFns.format)(dateHour, 'HH:mm:ss');
}
function GetTimeStamp(hour) {
  const [hora, minuto, segundo] = hour.split(':');
  let dateHour = new Date(1995, 6, 1, parseInt(hora), parseInt(minuto), parseInt(segundo));
  // dateHour = addHours(dateHour, parseInt(hora));
  // dateHour = addMinutes(dateHour, parseInt(minuto));
  // dateHour = addSeconds(dateHour, parseInt(segundo));
  return dateHour.getTime();
}
function VerifyAllDaySchedules(allAppointments, selectedAppointment) {
  let result = true;
  allAppointments.forEach(appointment => {
    if (GetTimeStamp(selectedAppointment.start_hour) == GetTimeStamp(appointment.start_hour) || GetTimeStamp(selectedAppointment.start_hour) >= GetTimeStamp(appointment.start_hour) && GetTimeStamp(selectedAppointment.start_hour) < GetTimeStamp(appointment.end_hour) || GetTimeStamp(selectedAppointment.end_hour) > GetTimeStamp(appointment.start_hour) && GetTimeStamp(selectedAppointment.end_hour) <= GetTimeStamp(appointment.end_hour) || GetTimeStamp(selectedAppointment.start_hour) <= GetTimeStamp(appointment.start_hour) && GetTimeStamp(selectedAppointment.end_hour) >= GetTimeStamp(appointment.end_hour)) {
      result = false;
      return;
    }
  });
  return result;
}
function GetAllPossibleAppointmentsHours({
  startHour,
  endHour,
  serviceDuration,
  dateScheduled,
  user_id,
  serviceType_id
}) {
  // let startHour = userConfigs.start_workHour;
  let startHourTimeStamp = GetTimeStamp(startHour);
  let endHourTimeStamp = GetTimeStamp(endHour);
  let allHours = [];
  while (true) {
    if (startHourTimeStamp >= endHourTimeStamp) {
      break;
    }
    let hour = {
      start_hour: startHour,
      end_hour: SetEndHour(startHour, serviceDuration),
      duration: serviceDuration,
      date_scheduled: dateScheduled,
      user_id: user_id,
      serviceType_id: serviceType_id
      // client_id: client_id,
    };

    startHour = hour.end_hour;
    startHourTimeStamp = GetTimeStamp(startHour);
    if (GetTimeStamp(hour.end_hour) > endHourTimeStamp) {
      break;
    }
    allHours.push(hour);
  }
  return allHours;
}
function GetWorkDayInfos(date_scheduled, userWorkDays, user_premium) {
  let dateSelected = new Date(date_scheduled).getDay();
  let workDay = {
    work: user_premium ? true : false,
    start_hour: '0',
    end_hour: '0',
    weekDay: -1
  };
  if (dateSelected == 0) {
    workDay = {
      work: userWorkDays.sunday,
      start_hour: userWorkDays.sunday_startHour,
      end_hour: userWorkDays.sunday_endHour,
      weekDay: 0
    };
  }
  if (dateSelected == 1) {
    workDay = {
      work: userWorkDays.monday,
      start_hour: userWorkDays.monday_startHour,
      end_hour: userWorkDays.monday_endHour,
      weekDay: 1
    };
  }
  if (dateSelected == 2) {
    workDay = {
      work: userWorkDays.tuesday,
      start_hour: userWorkDays.monday_startHour,
      end_hour: userWorkDays.monday_endHour,
      weekDay: 2
    };
  }
  if (dateSelected == 3) {
    workDay = {
      work: userWorkDays.wednesday,
      start_hour: userWorkDays.wednesday_startHour,
      end_hour: userWorkDays.wednesday_endHour,
      weekDay: 3
    };
  }
  if (dateSelected == 4) {
    workDay = {
      work: userWorkDays.thursday,
      start_hour: userWorkDays.thursday_startHour,
      end_hour: userWorkDays.thursday_endHour,
      weekDay: 4
    };
  }
  if (dateSelected == 5) {
    workDay = {
      work: userWorkDays.friday,
      start_hour: userWorkDays.friday_startHour,
      end_hour: userWorkDays.friday_endHour,
      weekDay: 5
    };
  }
  if (dateSelected == 6) {
    workDay = {
      work: user_premium ? true : false,
      start_hour: userWorkDays.saturday_startHour,
      end_hour: userWorkDays.saturday_endHour,
      weekDay: 6
    };
  }
  return workDay;
}
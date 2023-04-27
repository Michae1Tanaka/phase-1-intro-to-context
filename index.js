function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  const employee = {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employee;
}

function createEmployeeRecords(multipleEmployeeArr) {
  return multipleEmployeeArr.map(createEmployeeRecord);
}

function createTimeInEvent(employeeObj, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  const timeInObj = {
    type: "TimeIn",
    hour: parseInt(hour),
    date: date,
  };
  employeeObj.timeInEvents.push(timeInObj);
  return employeeObj;
}

function createTimeOutEvent(employeeObj, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  const timeOutObj = {
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,
  };
  employeeObj.timeOutEvents.push(timeOutObj);
  return employeeObj;
}

function hoursWorkedOnDate(employeeObj, soughtDate) {
  let hoursWorked = 0;
  const timeIn = employeeObj.timeInEvents.find(
    (timeIn) => soughtDate === timeIn.date
  );
  const timeOut = employeeObj.timeOutEvents.find(
    (timeIn) => soughtDate === timeIn.date
  );
  if (timeIn && timeOut) {
    hoursWorked = (timeOut.hour - timeIn.hour) / 100;
  }
  return hoursWorked;
}

function wagesEarnedOnDate(employeeObj, soughtDate) {
  const hoursWorked = hoursWorkedOnDate(employeeObj, soughtDate);
  const payRate = employeeObj.payPerHour;
  return hoursWorked * payRate;
}

function allWagesFor(employeeObj) {
  console.log(employeeObj);
  const datesWorked = employeeObj.timeInEvents.map((timeIn) => timeIn.date);
  const totalWages = datesWorked.reduce(
    (acc, date) => acc + wagesEarnedOnDate(employeeObj, date),
    0
  );
  return totalWages;
}

function calculatePayroll(arrayOfEmployees) {
  let totalWages = arrayOfEmployees.reduce((acc, employeeObj) => {
    return acc + allWagesFor(employeeObj);
  }, 0);
  return totalWages;
}

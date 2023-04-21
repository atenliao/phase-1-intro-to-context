// Your code here
const createEmployeeRecord = (employee)=>{
    return {
        'firstName': employee[0],
        'familyName': employee[1],
        'title': employee[2],
        'payPerHour': employee[3],
        'timeInEvents':[],
        'timeOutEvents':[]
    }
}

const createEmployeeRecords =(employeeArray)=>{
    let ObjArray=[]
    for(let i =0; i< employeeArray.length; i++){
      ObjArray.push(createEmployeeRecord(employeeArray[i]))
    }
    return ObjArray
}


const createTimeInEvent= (employeeObj, dateStamp)=>{
    let strDate = dateStamp.split(" ")
    let TimeObj = {
        'type':'TimeIn',
        'hour': parseInt(strDate[1]),
        'date': strDate[0]
    }
    
    employeeObj.timeInEvents.push(TimeObj)
    return employeeObj
}

const createTimeOutEvent = (employeeObj, dateStamp) => {
    let strDate = dateStamp.split(" ")
    let TimeObj = {
        'type':'TimeOut',
        'hour': parseInt(strDate[1]),
        'date': strDate[0]
    }
    
    employeeObj.timeOutEvents.push(TimeObj)
    return employeeObj
}



const hoursWorkedOnDate = (employeeObj, dateStamp)=>{
    let hours
    let difftime
    let InIndex
    let OutIndex;
        InIndex = employeeObj.timeInEvents.findIndex(element=> element.date === dateStamp)

        OutIndex = employeeObj.timeOutEvents.findIndex(element => element.date === dateStamp)

        difftime = (employeeObj.timeOutEvents[OutIndex].hour - employeeObj.timeInEvents[InIndex].hour)
        hours = difftime /100
    return hours
}


const wagesEarnedOnDate = (employeeObj, dateStamp)=>{
    let payOwed = hoursWorkedOnDate(employeeObj, dateStamp) * employeeObj.payPerHour
    return payOwed
}

const allWagesFor = (employeeObj)=>{
    let i = 0
    let sum=0
    employeeObj.timeOutEvents.forEach((element)=>{
        sum = sum + (element.hour - employeeObj.timeInEvents[i].hour)/100 * employeeObj.payPerHour
        i++;
    })
    return sum
}

const calculatePayroll = (employeeArray) => {
    let sum = 0;
    employeeArray.forEach((element)=>{
       sum = sum+ allWagesFor(element)
    })
    return sum
}
// Your code here
const createEmployeeRecord = (array) => {
    const newEmployee = {
            firstName: `${array[0]}`,
            familyName: `${array[1]}` ,
            title: `${array[2]}`,
            payPerHour: Number(`${array[3]}`),
            timeInEvents:[] ,
            timeOutEvents: []
        
    }

    return newEmployee
}

const createEmployeeRecords = (array) => {

    const newEmployeeRecords = []

    array.forEach( employeeRecord => {
        const newRecord = createEmployeeRecord(employeeRecord);
        newEmployeeRecords.push(newRecord)
    
    })

    return newEmployeeRecords

}

const createTimeInEvent = (object, date) => {
    const timeInObj = {
        type: "TimeIn",
        date: `${date.slice(0,10)}`,
        hour: Number(`${date.slice(-4)}`)
    }

   object["timeInEvents"].push(timeInObj)

    return object
}

const createTimeOutEvent = (object, date) => {
    const timeOutObj = {
        type: "TimeOut",
        date: `${date.slice(0,10)}`,
        hour: Number(`${date.slice(-4)}`)
    }

   object["timeOutEvents"].push(timeOutObj)

    return object
}

const hoursWorkedOnDate = (object, date) => {
    const timeIn = object['timeInEvents'].find((x) => x.date === date).hour;
    const timeOut = object['timeOutEvents'].find((x) => x.date === date).hour;




    return (timeOut - timeIn) / 100
}

const wagesEarnedOnDate = (object, date) => {

    const hours = hoursWorkedOnDate(object,date)
    const pay = object["payPerHour"]

    return hours * pay


}



const allWagesFor = (object) => {

    const pay = object.payPerHour

    const dates = object["timeInEvents"].map((x) => x.date)

    const hoursWorked = dates.map((x) => hoursWorkedOnDate(object, x)).reduce((total, amount) => total + amount)

    

    return hoursWorked * pay

}

const findEmployeeByFirstName = (srcArray, firstName) => {
    const result = srcArray.map((x) => x.firstName).find((x) => x === firstName)

    return result

}

const calculatePayroll = (array) => {
    const wages = array.map((x) => allWagesFor(x))
    return wages.reduce((total, amount) => total + amount)
}

const testObject = [
    {
        firstName: "First",
        familyName: "Last" ,
        title: "Occupation",
        payPerHour: 12,
        timeInEvents:[
            {
                
                    type: "TimeIn",
                    date: '0044-03-15',
                    hour: 1100
                
            },
            {
                
                type: "TimeIn",
                date: '0044-03-14',
                hour: 1100
            
        }
        ] ,
        timeOutEvents: [
            {
                
                type: "TimeOut",
                date: '0044-03-15',
                hour: 1400
            
        },
        {
                
            type: "TimeIn",
            date: '0044-03-14',
            hour: 1600
        
    }
        ]     
    },
    {
        firstName: "John",
        familyName: "Last" ,
        title: "Occupation",
        payPerHour: 12,
        timeInEvents:[
            {
                
                    type: "TimeIn",
                    date: '0044-03-15',
                    hour: 1100
                
            },
            {
                
                type: "TimeIn",
                date: '0044-03-14',
                hour: 1100
            
        }
        ] ,
        timeOutEvents: [
            {
                
                type: "TimeOut",
                date: '0044-03-15',
                hour: 1400
            
        },
        {
                
            type: "TimeIn",
            date: '0044-03-14',
            hour: 1600
        
    }
        ]     
    }
]


const testDate = '0044-03-15';


console.log(calculatePayroll(testObject))

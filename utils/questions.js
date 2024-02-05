// Declaring Variables
const { getInfoFromDatabaseAt } = require('../db/db.js');


// Creating Questions class
class Question {
    constructor(type, name, message) {
        this.type = type || 'input';
        this.name = name;
        this.message = message;
    }
}


// Creating list class
class List extends Question {
    constructor(type, name, message, choices) {
        super(type, name, message);
        this.choices = choices;
    }
}


// Table Names
const table = ['departments', 'Roles', 'Employees'];


// // Starter questions to prompt user
const choices = [
    'View all departments',
    'View all Roles',
    'View all Employees',
    'Add a department',
    'Add a Role',
    'Add an Employee',
    'Update an Employee role',
    'Update an Employees Manager',
    'Quit'
]


// Question to ask if user wants to add a department
const addDepartment = () => {
    return [ new Question(null, 'Name', 'What is your new department name?') ];
}


// Question to ask if user wants to update an Employees Role
const updateEmployeeRole = async () => {
    try {
        const choices1 = await getAllEmployeesAndID();
        const choices2 = await getDataAtTable(1, 1);
        return [
            new List('list', 'Employee', 'Which Employees role is changing?', choices1),
            new List('list', 'Role_ID', 'What is this Employees new role?', choices2)
        ]
    }
    catch(error) {
        handleAndLogError('updateEmployeeRole', error); // Error Handling
    }
}


// Question to ask if user wants to update an Employees Manager
const updateEmployeeManager = async () => {
    try {
        const choices1 = await getAllEmployeesAndID();
        const choices2 = await getDataAtTable(2, 2);
        return [
            new List('list', 'Employee', 'Which Employees Manager is changing?', choices1),
            new List('list', 'Direct_Manager', 'Who is this Employees new Manager?', choices2)
        ]
    }
    catch(error) {
        handleAndLogError('updateEmployeeManager', error); // Error Handling
    }
}


// Question to ask if user wants to add a Role
const addRole = async () => {
    try {
        const choices = await getDataAtTable(0, 3);
        return [
            new Question(null, 'Title', 'What is this new roles title?'),
            new List('list', 'department_ID', 'What department will this role belong to?', choices),
            new Question(null, 'Salary', 'What is the salary for this role?')
        ]  
    }
    catch(error) {
        handleAndLogError('addRole', error); // Error Handling
    }
}


// Question to ask if user wants to add an Employee
const addEmployee = async () => {
    try {
        const choices2 = await getDataAtTable(1, 1);
        const choices3 = await getDataAtTable(2, 2);
        return [
            new Question(null, 'Firstname', 'What is the employees Firstname?'),
            new Question(null, 'Lastname', 'What is the employees Lastname?'),
            new List('list', 'Role_ID', 'What is this employees job title?', choices2),
            new Question(null, 'Salary', 'What is this employees salary?'),
            new List('list', 'Direct_Manager', 'Who is this employees direct supervisor?', choices3)
        ]
    }
    catch(error) {
        handleAndLogError('addEmployee', error); // Error Handling
    }
}


// Gets all employees from database and returns their names and id's
const getAllEmployeesAndID = async () => {
    try {
        let employees = [];
        const allEmployees = await getInfoFromDatabaseAt(table[2]);

        // Grabs all Employees Fullnames and ID's and returns them
        for(let employee of allEmployees) {
            employees.push(`${employee.id}: ${employee.Firstname} ${employee.Lastname}`);
        }
        return employees;
    }
    catch(error) {
        handleAndLogError('getAllEmployeesAndID', error); // Error Handling
    }
}


// Gets all employee roles from database and returns them
const getDataAtTable = async (index, i) => {
    // Data Sanitation
    if(typeof i != 'number' && typeof index != 'number') {
        throw new Error('Invalid Input. Both Parameters (index and i) must be numbers');
    }
    try {
        let data = [];
        const allData = await getInfoFromDatabaseAt(table[index]);
        // Grabs all values in specified column and retuens them
        for(let row of allData) {
            switch(i) {
                case 1: data.push(row.Title); break;
                case 2: data.push(row.Direct_Manager); break;
                case 3: data.push(row.Name); break;
                default: console.log(`${i} is Not a valid i`);
            }
        }
        return data;
    }
    catch (error) {
        handleAndLogError('getDataAtTable', error); // Error Handling
    }
}


// Handles Error Messages and Logs them
function handleAndLogError(functionName, error) {
    console.error(`Error in: ${functionName} function: ${error.message}`);
    throw error;
}



// Dynamic message prompts and getters
const questions = [addDepartment(), addRole(), addEmployee(), updateEmployeeRole(), updateEmployeeManager()];


// Exporting Modules
module.exports = { Question, List, questions, table, choices, handleAndLogError }
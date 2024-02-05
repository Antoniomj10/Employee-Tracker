const { createConnection } = require('mysql2');
require('dotenv').config();


const database = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise();


// Retrieves all data from the specified table in database (Read)
async function getInfoFromDatabaseAt(tableName) {
    if(typeof tableName != 'string') {
        throw new Error('Invalid Input. Table name must be a String');
    }
    try {
        // Execute SQL query
        const response = (await database.query('SELECT * FROM ??', [tableName]))[0];
        return response;
    }
    catch(error) {
        // Error Handling
        console.error(`Error in getInfoFromDatabaseAt function: ${error.message}`);
        throw error;
    }
}


// Adds a new record to the specified table in database (Create)
async function addToDatabase(tableName, columns, values) {
    if(typeof tableName != 'string' && typeof columns != 'object' && typeof values != 'object') {
        throw new Error('Invalid Input. tableName must be a string, columns must be an array, values must be an array!');
    }
    try {
        // Execute SQL query
        const query = `INSERT INTO ?? (${columns.join(', ')}) VALUES(?)`;
        const response = await database.query(query, [tableName, values]);
        return response;
    }
    catch(error) {
        // Error Handling
        console.error(`Error in addToDatabase function: ${error.message}`);
        throw error;
    }
}


// Updates existing data in the specified table (Update)
async function updateDatabase(tableName, columnNames, values, id) {
    // Data Sanitation
    if(typeof tableName != 'string' && typeof columnNames != 'object' && typeof values != 'object') {
        throw new Error('Invalid Input. tableName must be a string, columnNames must be an array, values must be an array!');
    }
    try {
        // Execute SQL query
        const query = `UPDATE ?? SET ?? = ? WHERE id = ?`;
        const response = await database.query(query, [tableName, columnNames[0], values[0], id]);
    }
    catch(error) {
        // Error Handling
        console.error(`Error in updateDatabase function: ${error.message}`);
        throw error;
    }
    return 'updated';
}


// Exporting Modules
module.exports = { getInfoFromDatabaseAt, addToDatabase, updateDatabase }
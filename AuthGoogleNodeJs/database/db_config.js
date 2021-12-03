const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "refactory"
});

module.exports = db;
const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
// Create a connection to the database
var connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host: dbConfig.HOST,
        user: dbConfig.USER,
        password: dbConfig.PASSWORD,
        database: dbConfig.DB
    });
// open the MySQL connection
    connection.connect(error => {
        if (error) throw error;
        console.log("Successfully connected to the database.");
    });

    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();

module.exports = connection;
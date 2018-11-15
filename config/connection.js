
var Sequelize = require("sequelize");

var sequelizeConnection = new Sequelize("sequelize_fan_blog", "root", "root", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelizeConnection;

// var mysql = require("mysql");


// if(process.env.JAWSDB_URL){
//     connection = mysql.createConnection(process.env.JAWSDB_URL);
// }else{
//     connection = mysql.createConnection({
//         host: "localhost",
//         port: 3306,
//         user: "root",
//         password: "root",
//         database: "fan_theories_db"
//     })
// }


// connection.connect(function(err){
//     if(err){
//         console.error("error connection: " + err.stack);
//         return;
//     };
//     console.log("connected as id " + connection.threadId);
// });

// module.exports = connection;
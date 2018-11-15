
var sequelizeConnection = require("../config/connection.js")

var theoryModel = sequelizeConnection.define("theory", {
    id: Sequelize.INT,
    media_name: Sequelize.STRING,
    creator: Sequelize.STRING,
    date_posted: Sequelize.DATE,
    theory: Sequelize.STRING,
    likes: Sequelize.INT,
})

theoryModel.sync();

module.exports = theoryModel;

// const orm = require("../config/orm.js");

// let theories = {
//     all: function (cb) {
//         orm.all("theories", (res) => {
//             cb(res);
//         })
//     },
//     create: function (cols, vals, cb) {
//         orm.create("theories", cols, vals, (res) => {
//             cb(res);
//         })
//     },
//     update: function (objColVals, condition, cb) {
//         orm.update("theories", objColVals, condition, (res) => {
//             cb(res);
//         })
//     },
//     delete: function (condition, cb) {
//         orm.delete("theories", condition, (res) => {
//             cb(res);
//         })
//     },
//     readName: function (condition, cb) {
//         orm.readName("theories", condition, (res) => {
//             cb(res);
//         })
//     }
// }

// module.exports = theories;
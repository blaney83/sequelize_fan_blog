

const db = require("../models")
const path = require("path");

module.exports = function (app) {

    app.post("/main", function (req, res) {
        // let resData = JSON.stringify(req)
        // console.log("this is what I'm looking for" + resData);
        // let query = {};
        // if (req.query.author_id) {
        //     query.AuthorId = req.query.author_id;
        // }

        db.theory_table.findAll({
            // include: [db.author_table]
        }).then(function (data) {
            console.log(data)
            if(res.json(data)){
                console.log("sent")
            }else{
                console.log("not sent")
            };
            console.log("im trying to send stuff:(")
        });
    });

}
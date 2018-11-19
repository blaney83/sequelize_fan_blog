
const db = require("../models")
const path = require("path");

module.exports = function(app){

    app.post("/api/users", function(req, res) {
        let resData = req
        console.log(res)
        console.log("this is what I'm looking for" + resData);
        db.author_table.create(req.body).then(function(response){
            res.json(response)
        })
    });


}
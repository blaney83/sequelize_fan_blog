
const db = require("../models")
const path = require("path");

module.exports = function(app){
    app.get("/", function(req, res){
        console.log(req)
        res.render("index")
    });

    app.get("/main", function(req, res) {
        res.render("mainpage");
    })

    // app.get("/main", function(req, res) {
    //     let query = {};
    //     console.log(req)
    //     console.log(query)
    //     console.log(req.query.author_id)
    //     if(req.query.author_id){
    //         query.authorid = req.query.author_id;
    //     }
    //     db.theories_tables.findAll({

    //     }).then(function(data){
    //         console.log(data)
    //     })
    //     // res.render("mainpage", db.theories)
    // });
}

const express = require("express");
const router = express.Router();
const theories = require("../models/theories.js");
const moment = require("moment")

router.get("/", function (req, res) {
    theories.all((data) => {
        console.log(data)
        data.forEach((obj) => {
            obj.date_posted = moment(obj.date_posted).format('MMMM Do YYYY, h:mm:ss a')
            return obj;
        })
        let hbsObj = {
            theories: data
        };
        console.log(hbsObj);
        res.render("index", hbsObj)
    });
});

router.get("/api/", function (req, res) {
    theories.all((data) => {
        console.log(data)
        data.forEach((obj) => {
            obj.date_posted = moment(obj.date_posted).format('MMMM Do YYYY, h:mm:ss a')
            return obj;
        })
        let hbsObj = {
            theories: data
        };
        console.log(hbsObj);
        res.json(hbsObj)
    });
});

router.post("/api/theories", function (req, res) {
    console.log(req);
    theories.create([
        "media_name", "creator", "theory"
    ], [
            req.body.media_name, req.body.creator, req.body.theory
        ], (result) => {
            console.log(result)
            res.json({ id: result.id })
        })
});

router.put("/api/theories/:id", function (req, res) {
    let condition = "id = " + req.params.id;
    console.log("condition", condition);
    theories.update(req.body, condition, (result) => {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
});

router.delete("/api/theories/:id", function (req, res) {
    let condition = "id = " + req.params.id;
    console.log(condition)
    theories.delete(condition, (result) => {
        console.log(result)
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})

//readName
module.exports = router;
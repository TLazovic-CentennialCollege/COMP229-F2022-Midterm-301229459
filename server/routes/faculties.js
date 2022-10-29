// faculties.js, Tomislav Lazovic, 301229459, Faculty Information web App,10/28/2022
// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const faculties = require("../models/faculties")
// const faculties = require("../models/faculties");
// const faculties = require("../models/faculties");

// define the faculty model
let faculty = require("../models/faculties");

/* GET faculties List page. READ */
router.get("/", (req, res, next) => {
  // find all faculties in the faculties collection
  faculty.find((err, faculties) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("faculties/index", {
        title: "Faculties",
        faculties: faculties,
      });
    }
  });
});

//  GET the faculty Details page in order to add a new faculty
router.get("/add", (req, res, next) => {
  res.render("faculties/add", {
    title: "add",
    nextURL: "/faculties/add",
    faculties: {},
  });
});

// POST process the faculty  Details page and create a new faculty  - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  console.log("Post /add");
  let f = {
    Facultyid: req.body.Facultyid,
    Facultyname: req.body.Facultyname,
    Department: req.body.Department,
    Subject: req.body.Subject,
  }
  faculty.create(f);
  res.redirect("/faculties");
});

// GET the faculty  Details page in order to edit an existing faculty
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  faculty.findById(req.params.id, function (err, data) {
    // if (err) return handleError(err);
    // deleted at most one tank document
    console.log("err: " + err + ",\ndata: " + data);
    res.render("faculties/details", {
      title: "a",
      nextURL: "/faculties/" + data._id,
      faculties: data,
    });

  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  console.log("post /id");
  let f = {
    Facultyid: req.body.Facultyid,
    Facultyname: req.body.Facultyname,
    Department: req.body.Department,
    Subject: req.body.Subject,
  }
  faculty.updateOne({_id: req.params.id}, f, {}, function (err, data) {
    // if (err) return handleError(err);
    // deleted at most one tank document
    
    console.log("err: " + err + ",\ndata: " + data);
    res.redirect("/faculties");

  });
});

// GET - process the delete
router.get("/delete/:name", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   console.log("Post /delete");
  //  faculty.deleteOne({Facultyname: req.params.name});
   faculty.deleteOne({ Facultyname: req.params.name }, function (err) {
    // if (err) return handleError(err);
    // deleted at most one tank document
    console.log(err);
    res.redirect("/faculties");
  });
});

module.exports = router;

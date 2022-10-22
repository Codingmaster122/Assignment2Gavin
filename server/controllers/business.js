let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create reference to the model (dbschema )
let business = require("../models/business");

module.exports.displaybusinessList = (req, res, next) => {
  business.find((err, businessList) => {
    if (err) {
      return console.error(err);
    } else {
      //console.log(businessList);

      res.render("business/list", {
        title: "businesss",
        businessList: businessList,
        displayName: req.user ? req.user.displayName : "",
      });
      //render business.ejs and pass title and businesslist variable we are passing businessList object to businessList property
    }
  });
};

module.exports.addpage = (req, res, next) => {
  res.render("business/add", {
    title: "Add business",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.addprocesspage = (req, res, next) => {
  let newbusiness = business({
    phone: req.body.phone,
    name: req.body.name,
    email: req.body.email,
  
  });
  business.create(newbusiness, (err, business) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the business list
      res.redirect("/business-list");
    }
  });
};

module.exports.displayeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  business.findById(id, (err, businesstoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("business/edit", {
        title: "Edit business",
        business: businesstoedit,
        displayName: req.user ? req.user.displayName : "",
      });
    }
  });
};

module.exports.processingeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatebusiness = business({
    _id: id,
    phone: req.body.phone,
    name: req.body.name,
    email: req.body.email,
  
  });
  business.updateOne({ _id: id }, updatebusiness, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the business list
      res.redirect("/business-list");
    }
  });
};

module.exports.deletepage = (req, res, next) => {
  let id = req.params.id;
  business.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh business list
      res.redirect("/business-list");
    }
  });
};

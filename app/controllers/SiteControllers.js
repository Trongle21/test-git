const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  //[GET] /news
  async index(req, res) {
    try {
      await Course.find({}).then((courses) => {
        res.render("home", { courses: multipleMongooseToObject(courses) });
      });
    } catch (error) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }
  
  //[GET] /news:slug
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();

const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class MeControllers {
  
  //[GET] me/stored/courses
  async storedCourses(req, res) { 
    try {
      const countDelete = await Course.countDocumentsWithDeleted({
        deleted: true,
      });
      const courses = await Course.find({});
      await res.render("me/stored-courses", {
        countDelete,
        courses: multipleMongooseToObject(courses),
      });
    } catch (err) {
      res.status(500);
    }
  }

  //[GET] me/trash/courses
  async trashCourses(req, res) {
    try {
      const courses = await Course.findDeleted({});
      await res.render("me/trash-courses", {
        courses: multipleMongooseToObject(courses),
      });
    } catch (err) {
      res.status(500);
    }
  }
}

module.exports = new MeControllers();

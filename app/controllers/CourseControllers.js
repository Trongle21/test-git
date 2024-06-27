const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");
class CourseController {
  
  //[GET] /courses/:slug
  async show(req, res) {
    try {
      const course = await Course.findOne({ slug: req.params.slug });
      await res.render("courses/show", { course: mongooseToObject(course) });
    } catch (error) {
      res.status(500);
    }
  }

  //[GET] /courses/create
  async create(req, res) {
    try {
      await res.render("courses/create");
    } catch (error) {
      res.status(500);
    }
  }

  //[POST] /courses/create
  async store(req, res) {
    try {
      const formData = await req.body;
      formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
      const course = new Course(formData);
      await course.save();
      await res.redirect("/me/stored/courses");
    } catch (error) {
      res.status(500);
    }
  }

  //[GET] /courses/:id/edit
  async edit(req, res) {
    try {
      const course = await Course.findById(req.params.id);
      await res.render("courses/edit", { course: mongooseToObject(course) });
    } catch (error) {
      res.status(500);
    }
  }

  //[PUT] /courses/:id
  async update(req, res) {
    try {
      await Course.updateOne({ _id: req.params.id }, req.body);
      await res.redirect("/me/stored/courses");
    } catch (error) {
      res.status(500);
    }
  }
  //[PATCH] /courses/:id/restore
  async restore(req, res) {
    try {
      await Course.restore({ _id: req.params.id });
      await res.redirect("back");
    } catch (error) {
      res.status(500);
    }
  }
  
  //[DELETE] /courses/:id
  async delete(req, res) {
    try {
      await Course.delete({ _id: req.params.id });
      await res.redirect("back");
    } catch (error) {
      res.status(500);
    }
  }

  //[DELETE] /courses/:id/force
  async forceDelete(req, res) {
    try {
      await Course.deleteOne({ _id: req.params.id });
      await res.redirect("back");
    } catch (error) {
      res.status(500);
    }
  }

  //[POST] /courses/handle-action-form
  async handleActionForm(req, res) {
    try {
      switch (req.body.action) {
        case "delete":
          await Course.delete({ _id: { $in: req.body.courseIds } });
          await res.redirect("back");
          break;
        default:
          res.json({ message: error });
      }
    } catch (error) {
      res.status(500);
    }
  }
}

module.exports = new CourseController();

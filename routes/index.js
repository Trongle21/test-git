const newsRouter = require("./news");
const coursesRouter = require("./courses");
const meRouter = require("./me");
const siteROuter = require("./site");

function route(app) {
  app.use("/news", newsRouter);
  app.use("/me", meRouter);
  app.use("/courses", coursesRouter);
  app.use("/", siteROuter);
}

module.exports = route;

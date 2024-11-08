const routes = require("express").Router();
const UserRoutes = require("./router/UserRouter.js");

routes.use("/user", UserRoutes);

module.exports = routes;
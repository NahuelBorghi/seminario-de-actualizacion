const routes = require("express").Router();
const UserRoutes = require("./router/UserRouter.js");
const RoleRoutes = require("./router/RoleRouter.js");
const RolesActionsRoutes = require("./router/RolesActionsRouter.js");

routes.use("/user", UserRoutes);
routes.use("/roles", RoleRoutes);
routes.use("/actions", RolesActionsRoutes);

module.exports = routes;
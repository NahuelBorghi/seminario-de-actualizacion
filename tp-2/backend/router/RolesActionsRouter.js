// // Routes for RolesActionsController
const RolesActionsRoutes = require("express").Router();
const RolesActionsController = require("../controller/RolesActionsController.js");
const RolesActions = require("../model/RolesActionsModel.js");
const rolesActionsController = new RolesActionsController();

RolesActionsRoutes.post("/", async (req, res, next) => {
    try {
        await rolesActionsController.create(req, res);
    } catch (error) {
        next(error);
    }
});

RolesActionsRoutes.get("/", async (req, res, next) => {
    try {
        await rolesActionsController.getAllRolesActionss(req, res);
    } catch (error) {
        next(error);
    }
});

RolesActionsRoutes.put("/", async (req, res, next) => {
    try {
        await rolesActionsController.updateRolesActions(req, res);
    } catch (error) {
        next(error);
    }
});

RolesActionsRoutes.delete("/", async (req, res, next) => {
    try {
        await rolesActionsController.deleteRolesActions(req, res);
    } catch (error) {
        next(error);
    }
});

RolesActionsRoutes.get("/:actionId", async (req, res, next) => {
    try {
        await rolesActionsController.getRolesActionsById(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = RolesActionsRoutes;

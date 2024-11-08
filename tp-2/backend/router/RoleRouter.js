// // Routes for RoleController
const RoleRoutes = require("express").Router();
const RoleController = require("../controller/RoleController.js");
const Role = require("../model/RoleModel.js");
const roleController = new RoleController();

RoleRoutes.post("/", async (req, res, next) => {
    try {
        await roleController.create(req, res);
    } catch (error) {
        next(error);
    }
});

RoleRoutes.get("/", async (req, res, next) => {
    try {
        await roleController.getAllRoles(req, res);
    } catch (error) {
        next(error);
    }
});

RoleRoutes.put("/", async (req, res, next) => {
    try {
        await roleController.updateRole(req, res);
    } catch (error) {
        next(error);
    }
});

RoleRoutes.delete("/", async (req, res, next) => {
    try {
        await roleController.deleteRole(req, res);
    } catch (error) {
        next(error);
    }
});

RoleRoutes.get("/:roleId", async (req, res, next) => {
    try {
        await roleController.getRoleById(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = RoleRoutes;

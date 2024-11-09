// // Routes for RoleController
const RoleRoutes = require("express").Router();
const RoleController = require("../controller/RoleController.js");
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

RoleRoutes.put("/:id", async (req, res, next) => {
    try {
        await roleController.updateRole(req, res);
    } catch (error) {
        next(error);
    }
});

RoleRoutes.delete("/:id", async (req, res, next) => {
    try {
        await roleController.deleteRole(req, res);
    } catch (error) {
        next(error);
    }
});

RoleRoutes.get("/:id", async (req, res, next) => {
    try {
        await roleController.getRoleById(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = RoleRoutes;

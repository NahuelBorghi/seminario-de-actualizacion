const BaseException = require("../exceptions/BaseException");
const RolesActionsService = require("../services/rolesActionsService");

class RolesActionsController {
    constructor() {
        const label = `-------------------- RolesActionsController setup - ${Date.now()}`;
        console.time(label);
        this.rolesActionsService = new RolesActionsService();
        console.timeLog(label, "RolesActionsService setup complete");
        console.timeEnd(label);
    }
    async create(req, res) {
        const label = `-------------------- RolesActions creation - ${Date.now()}`;
        console.time(label);
        try {
            const { rolesActionsName } = req.body;
            await this.rolesActionsService.createRolesActions(rolesActionsName, roleId);
            console.timeLog(label, "rolesActions created successfully");
            console.timeEnd(label);
            return res.status(201).send({ message: "RolesActions created successfully" });
        } catch (error) {
            console.timeEnd(label);
            throw new BaseException( `RolesActionsController.create: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RolesActionsCreationError" );
        }
    }
    async getAllRolesActionss(req, res) {
        const label = `-------------------- RolesActions getAllRolesActionss - ${Date.now()}`;
        console.time(label);
        try {
            const rolesActionss = await this.rolesActionsService.getAllRolesActionss();
            console.timeLog(label, "rolesActionss found successfully");
            console.timeEnd(label);
            return res.send({ rolesActionss: rolesActionss });
        } catch (error) {
            console.timeEnd(label);
            throw new BaseException( `RolesActionsController.getAllRolesActionss: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RolesActionsLoginError" );
        }
    }
    async updateRolesActions(req, res) {
        const label = `-------------------- RolesActions logout - ${Date.now()}`;
        console.time(label);
        try {
            const { id, rolesActionsName } = req.rolesActions;
            await this.rolesActionsService.updateRolesActions(id, rolesActionsName, roleId);
            console.timeLog(label, "rolesActions updated successfully");
            console.timeEnd(label);
            return res.status(200).send({ message: "RolesActions updated" });
        } catch (error) {
            console.timeEnd(label);
            throw new BaseException( `RolesActionsController.logout: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RolesActionsLogoutError" );
        }
    }
    async getRolesActionsById(req, res) {
        const label = `-------------------- Get rolesActions by ID - ${Date.now()}`;
        console.time(label);
        try {
            const { id } = req.query;
            const rolesActions = await this.rolesActionsService.getRolesActionsById(id);
            console.timeLog(label, "rolesActions found successfully");
            console.timeEnd(label);
            return res.status(200).send(rolesActions);
        } catch (error) {
            console.timeEnd(label);
            throw new BaseException( `RolesActionsController.getRolesActionsById: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RolesActionsGetError" );
        }
    }

    async deleteRolesActions(req, res) {
        const label = `-------------------- RolesActions delete - ${Date.now()}`;
        console.time(label);
        try {
            const { id } = req.rolesActions;
            await this.rolesActionsService.deleteRolesActions(id);
            console.timeLog(label, "rolesActions deleted successfully");
            console.timeEnd(label);
            return res.status(200).send({ message: "RolesActions deleted" });
        } catch (error) {
            console.timeEnd(label);
            throw new BaseException( `RolesActionsController.deleteRolesActions: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RolesActionsDeleteError" );
        }
    }
}

module.exports = RolesActionsController;

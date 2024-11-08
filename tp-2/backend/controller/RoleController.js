const BaseException = require("../exceptions/BaseException");
const RoleService = require("../services/roleService");

class RoleController {
    constructor() {
        const label = `-------------------- RoleController setup - ${Date.now()}`;
        console.time(label);
        this.roleService = new RoleService();
        console.timeLog(label, "RoleService setup complete");
        console.timeEnd(label);
    }
    async create(req, res) {
        const label = `-------------------- Role creation - ${Date.now()}`;
        console.time(label);
        try {
            const { roleName } = req.body;
            await this.roleService.createRole(roleName);
            console.timeLog(label, "role created successfully");
            console.timeEnd(label);
            return res.status(201).send({ message: "Role created successfully" });
        } catch (error) {
            console.timeEnd(label);
            throw new BaseException( `RoleController.create: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RoleCreationError" );
        }
    }
    async getAllRoles(req, res) {
        const label = `-------------------- Role getAllRoles - ${Date.now()}`;
        console.time(label);
        try {
            const roles = await this.roleService.getAllRoles();
            console.timeLog(label, "roles found successfully");
            console.timeEnd(label);
            return res.send({ roles: roles });
        } catch (error) {
            console.timeEnd(label);
            throw new BaseException( `RoleController.getAllRoles: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RoleLoginError" );
        }
    }
    async updateRole(req, res) {
        const label = `-------------------- Role logout - ${Date.now()}`;
        console.time(label);
        try {
            const { id, roleName } = req.role;
            await this.roleService.updateRole(id, roleName);
            console.timeLog(label, "role updated successfully");
            console.timeEnd(label);
            return res.status(200).send({ message: "Role updated" });
        } catch (error) {
            console.timeEnd(label);
            throw new BaseException( `RoleController.logout: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RoleLogoutError" );
        }
    }
    async getRoleById(req, res) {
        const label = `-------------------- Get role by ID - ${Date.now()}`;
        console.time(label);
        try {
            const { id } = req.query;
            const role = await this.roleService.getRoleById(id);
            console.timeLog(label, "role found successfully");
            console.timeEnd(label);
            return res.status(200).send(role);
        } catch (error) {
            console.timeEnd(label);
            throw new BaseException( `RoleController.getRoleById: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RoleGetError" );
        }
    }

    async deleteRole(req, res) {
        const label = `-------------------- Role delete - ${Date.now()}`;
        console.time(label);
        try {
            const { id } = req.query;
            await this.roleService.deleteRole(id);
            console.timeLog(label, "role deleted successfully");
            console.timeEnd(label);
            return res.status(200).send({ message: "Role deleted" });
        } catch (error) {
            console.timeEnd(label);
            throw new BaseException(`RoleController.deleteRole: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RoleDeleteError");
        }
    }
}

module.exports = RoleController;

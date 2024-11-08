const RoleService = require("../services/roleService");
const UserService = require("../services/userService");
const ActionService = require("../services/actionService");

class MainController {
    constructor() {
        this.roleService = new RoleService();
        this.userService = new UserService();
        this.roleActionService = new ActionService();
    }

    async getRoles(req, res) {
        const roles = await this.roleService.getRoles();
        return res.status(200).send(roles);
    }

    async createRole(req, res) {
        const role = req.body;
        const result = await this.roleService.createRole(role);
        return res.status(201).send(result);
    }

    async updateRole(req, res) {
        const role = req.body;
        const result = await this.roleService.updateRole(role);
        return res.status(200).send(result);
    }

    async deleteRole(req, res) {
        const roleId = req.params.id;
        const result = await this.roleService.deleteRole(roleId);
        return res.status(200).send(result);
    }

    async getUsers(req, res) {
        const users = await this.userService.getUsers();
        return res.status(200).send(users);
    }

    async createUser(req, res) {
        const user = req.body;
        const result = await this.userService.createUser(user);
        return res.status(201).send(result);
    }

    async updateUser(req, res) {
        const user = req.body;
        const result = await this.userService.updateUser(user);
        return res.status(200).send(result);
    }

    async deleteUser(req, res) {
        const userId = req.params.id;
        const result = await this.userService.deleteUser(userId);
        return res.status(200).send(result);
    }

    async getRoleActions(req, res) {
        const roleActions = await this.roleActionService.getRoleActions();
        return res.status(200).send(roleActions);
    }

    async createRoleAction(req, res) {
        const roleAction = req.body;
        const result = await this.roleActionService.createRoleAction(
            roleAction
        );
        return res.status(201).send(result);
    }

    async updateRoleAction(req, res) {
        const roleAction = req.body;
        const result = await this.roleActionService.updateRoleAction(
            roleAction
        );
        return res.status(200).send(result);
    }

    async deleteRoleAction(req, res) {
        const roleActionId = req.params.id;
        const result = await this.roleActionService.deleteRoleAction(
            roleActionId
        );
        return res.status(200).send(result);
    }
}

module.exports = MainController;

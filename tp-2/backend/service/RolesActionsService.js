const BaseException = require("../exceptions/BaseException");
const MySqlRepository = require("../repository/MySqlRepository");

class RolesActionsService {
    constructor() {
        console.time("RolesActionsService setup");
        this.mysqlRepository = new MySqlRepository();
        console.timeLog("RolesActionsService setup", "MySqlRepository setup complete");
        console.timeEnd("RolesActionsService setup");
    }

    async createRolesActions(actionName, roleId) {
        try {
            return await this.mysqlRepository.createRolesActions( actionName, roleId );
        } catch (error) {
            throw new BaseException( `createRolesActionsService: ${error.message}`, 400, "Bad Request", "RolesActionsCreationError" );
        }
    }

    async getAllRolesActionss() {
        try {
            const roles = await this.mysqlRepository.getAllRolesActions();
            return roles;
        } catch (error) {
            throw new BaseException( `loginRolesActionsService: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RolesActionsLoginError" );
        }
    }

    async updateRolesActions(id, actionName, roleId) {
        try {
            const role = await this.mysqlRepository.updateRolesActions(id, actionName, roleId);
            return role;
        } catch (error) {
            throw new BaseException( `logoutRolesActionsService: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RolesActionsLogoutError" );
        }
    }

    async getRolesActionsById(id) {
        try {
            return await this.mysqlRepository.getRolesActionsById(id);
        } catch (error) {
            throw new BaseException( `getRolesActionsByIdService: ${error.message}`, error.statusCode ?? 400, error.stack ?? "Bad Request", "RolesActionsNotFoundError" );
        }
    }
    
    async deleteRolesActions(id) {
        try {
            return await this.mysqlRepository.deleteRolesActions(id);
        } catch (error) {
            throw new BaseException(`deleteRolesActionsService: ${error.message}`, 400, "Bad Request", "RolesActionsDeletionError");
        }
    }
}

module.exports = RolesActionsService;

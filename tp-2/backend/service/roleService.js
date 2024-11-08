const BaseException = require("../exceptions/BaseException");
const MySqlRepository = require("../repository/MySqlRepository");

class RoleService {
    constructor() {
        console.time("RoleService setup");
        this.mysqlRepository = new MySqlRepository();
        console.timeLog("RoleService setup", "MySqlRepository setup complete");
        console.timeEnd("RoleService setup");
    }

    async createRole(roleName) {
        try {
            return await this.mysqlRepository.createRole( roleName );
        } catch (error) {
            throw new BaseException( `createRoleService: ${error.message}`, 400, "Bad Request", "RoleCreationError" );
        }
    }

    async getAllRoles() {
        try {
            const roles = await this.mysqlRepository.getAllRoles();
            return roles;
        } catch (error) {
            throw new BaseException( `loginRoleService: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RoleLoginError" );
        }
    }

    async updateRole(id, roleName) {
        try {
            const role = await this.mysqlRepository.updateRole(id, roleName);
            return role;
        } catch (error) {
            throw new BaseException( `logoutRoleService: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RoleLogoutError" );
        }
    }

    async getRoleById(id) {
        try {
            return await this.mysqlRepository.getRoleById(id);
        } catch (error) {
            throw new BaseException( `getRoleByIdService: ${error.message}`, error.statusCode ?? 400, error.stack ?? "Bad Request", "RoleNotFoundError" );
        }
    }
    
    async deleteRole(id) {
        try {
            return await this.mysqlRepository.deleteRole(id);
        } catch (error) {
            throw new BaseException(`deleteRoleService: ${error.message}`, 400, "Bad Request", "RoleDeletionError");
        }
    }
}

module.exports = RoleService;

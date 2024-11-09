const BaseException = require('../exceptions/BaseException');
const User = require('../model/UserModel');
const { createConnection } = require("mysql2/promise");
const { hashFunciton } = require('../utils/hash');


class MySqlRepository {
    constructor() {
        this.setup();
    }

    async setup() {
        const label = `-------------------- MySqlRepository setup - ${Date.now()}`;
        console.time(label);
        const env = {
            host:
                process.env.DB_HOST ||
                "FALTA VARIABLE DE ENTORNO DB_HOST",
            user:
                process.env.DB_USER ||
                "FALTA VARIABLE DE ENTORNO DB_USER",
            password:
                process.env.MYSQL_ROOT_PASSWORD ||
                "FALTA VARIABLE DE ENTORNO MYSQL_ROOT_PASSWORD",
            database:
                process.env.MYSQL_DATABASE ||
                "FALTA VARIABLE DE ENTORNO MYSQL_DATABASE",
        };
        try {
            this.connection = await createConnection(env);
            console.timeLog(label, "MySqlConnection setup complete");
        } catch (error) {
            console.error(error);
        }
        console.timeEnd(label);
    }

    // User methods
    async createUser(userName, password, email, state = 1, Roles_id = 1) {
        const { hash, salt } = hashFunciton(password);
        const newUser = new User(userName, hash, email, Roles_id, state);
        const query = `INSERT INTO Users (id, Roles_id, userName, password, email, state) VALUES (?, ?, ?, ?, ?, ?)`;
        try {
            console.log(newUser);
            const [result] = await this.connection.execute(query, [
                newUser.id,
                newUser.Roles_id,
                newUser.userName,
                newUser.password,
                newUser.email,
                newUser.state,
            ]);
            return result.affectedRows;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.createUser: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "UserCreationError"
            );
        }
    }

    async getUserById(id) {
        const query = `SELECT * FROM Users WHERE id = ?`;
        try {
            const [[result]] = await this.connection.execute(query, [id]);
            if (!result)
                throw new BaseException(
                    "User not found",
                    404,
                    "Not Found",
                    "UserNotFoundError"
                );
            const user = new User(
                result.userName,
                result.password,
                result.email,
                result.Roles_id,
                result.state,
                result.id
            );
            return user;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.getUserById: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "UserCreationError"
            );
        }
    }

    async getAllUsers() {
        const query = `SELECT * FROM Users`;
        try {
            const [result] = await this.connection.execute(query);
            return result;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.getAllUsers: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "UserCreationError"
            );
        }
    }

    async getUserByUserName(userName) {
        const query = `SELECT * FROM Users WHERE userName = ?`;
        try {
            const [[result]] = await this.connection.execute(query, [userName]);
            if (!result) {
                throw new BaseException(
                    "User not found",
                    404,
                    "Not Found",
                    "UserNotFoundError"
                );
            }
            const user = new User(
                result.userName,
                result.password,
                result.email,
                result.Roles_id,
                result.state,
                result.id
            );
            return user;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.getUserByUserName: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "UserCreationError"
            );
        }
    }

    async updateUserState(id, state) {
        const query = `UPDATE Users SET state = ? WHERE id = ?`;
        try {
            await this.connection.execute(query, [state, id]);
            const user = await this.getUserById(id);
            return user;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.updateUserState: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "UserCreationError"
            );
        }
    }

    async updateUser(id, userName, state, Roles_id) {
        const query = `UPDATE Users SET userName = ?, state = ?, Roles_id = ? WHERE id = ?`;
        try {
            await this.connection.execute(query, [
                userName,
                state,
                Roles_id,
                id,
            ]);
            const user = await this.getUserById(id);
            return user;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.updateUser: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "UserCreationError"
            );
        }
    }

    async deleteUser(id) {
        const query = `DELETE FROM Users WHERE id = ?`;
        try {
            await this.connection.execute(query, [id]);
            return true;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.deleteUser: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "UserCreationError"
            );
        }
    }

    // Role methods
    async createRole(roleName) {
        const query = `INSERT INTO Roles (roleName) VALUES (?)`;
        try {
            const [result] = await this.connection.execute(query, [roleName]);
            return result.affectedRows;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.createRole: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "RoleCreationError"
            );
        }
    }

    async getAllRoles() {
        const query = `SELECT * FROM Roles`;
        try {
            const [result] = await this.connection.execute(query);
            return result;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.getAllRoles: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "RoleCreationError"
            );
        }
    }

    async getRoleById(id) {
        const query = `SELECT * FROM Roles WHERE id = ?`;
        try {
            const [[result]] = await this.connection.execute(query, [id]);
            if (!result) {
                throw new BaseException(
                    "Role not found",
                    404,
                    "Not Found",
                    "RoleNotFoundError"
                );
            }
            return result;
        } catch (error) {
            console.error(error);
            throw new BaseException( `mysqlRepository.getRoleById: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RoleCreationError" );
        }
    }

    async getRoleByName(roleName) {
        const query = `SELECT * FROM Roles WHERE roleName = ?`;
        try {
            const [[result]] = await this.connection.execute(query, [roleName]);
            if (!result) {
                throw new BaseException( "Role not found", 404, "Not Found", "RoleNotFoundError" );
            }
            return result;
        } catch (error) {
            console.error(error);
            throw new BaseException( `mysqlRepository.getRoleByName: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RoleCreationError" );
        }
    }

    async updateRole(id, roleName) {
        const query = `UPDATE Roles SET roleName = ? WHERE id = ?`;
        try {
            await this.connection.execute(query, [roleName, id]);
            const role = await this.getRoleById(id);
            return role;
        } catch (error) {
            console.error(error);
            throw new BaseException( `mysqlRepository.updateRole: ${error.message}`, error.statusCode ?? 400, "Bad Request", "RoleCreationError" );
        }
    }

    async deleteRole(id) {
        const query = `DELETE FROM Roles WHERE id = ?`;
        try {
            await this.connection.execute(query, [id]);
            return true;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.deleteRole: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "RoleCreationError"
            );
        }
    }

    // RoleActions methods

    async createRolesActions(actionName, Roles_id) {
        const query = `INSERT INTO RoleActions (actionName, Roles_id) VALUES (?, ?)`;
        try {
            const [result] = await this.connection.execute(query, [
                actionName,
                Roles_id,
            ]);
            return result.affectedRows;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.createRolesActions: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "RolesActionsCreationError"
            );
        }
    }

    async getAllRolesActions() {
        const query = `SELECT * FROM RoleActions`;
        try {
            const [result] = await this.connection.execute(query);
            return result;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.getAllRolesActions: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "RolesActionsCreationError"
            );
        }
    }

    async getRolesActionsById(id) {
        const query = `SELECT * FROM RoleActions WHERE id = ?`;
        try {
            const [[result]] = await this.connection.execute(query, [id]);
            if (!result) {
                throw new BaseException( "RolesActions not found", 404, "Not Found", "RolesActionsNotFoundError" );
            }
            return result;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.getRolesActionsById: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "RolesActionsCreationError"
            );
        }
    }

    async getRolesActionsByRoleID(Roles_id) {
        const query = `SELECT * FROM RoleActions WHERE Roles_id = ?`;
        try {
            const [result] = await this.connection.execute(query, [Roles_id]);
            return result;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.getRolesActionsByRoleID: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "RolesActionsCreationError"
            );
        }
    }

    async getRolesActionsByActionID(id) {
        const query = `SELECT * FROM RoleActions WHERE id = ?`;
        try {
            const [result] = await this.connection.execute(query, [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.getRolesActionsByActionID: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "RolesActionsCreationError"
            );
        }
    }

    async updateRolesActions(id, Roles_id, actionName) {
        const query = `UPDATE RoleActions SET Roles_id = ?, actionName = ? WHERE id = ?`;
        try {
            await this.connection.execute(query, [Roles_id, actionName, id]);
            const roleAction = await this.getRolesActionsById(id);
            return roleAction;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.updateRolesActions: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "RolesActionsCreationError"
            );
        }
    }

    async deleteRolesActions(id) {
        const query = `DELETE FROM RoleActions WHERE id = ?`;
        try {
            await this.connection.execute(query, [id]);
            return true;
        } catch (error) {
            console.error(error);
            throw new BaseException(
                `mysqlRepository.deleteRolesActions: ${error.message}`,
                error.statusCode ?? 400,
                "Bad Request",
                "RolesActionsCreationError"
            );
        }
    }
}

module.exports = MySqlRepository;
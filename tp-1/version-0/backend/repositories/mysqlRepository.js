const mysql2 = require("mysql2/promise");

class MysqlRepository {
    constructor() {
        this.env = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.MYSQL_ROOT_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        };
        console.log(this.env);
    }

    // Métodos para roles
    async getRoles() {
        const connection = await mysql2.createConnection(this.env);
        const [rows] = await connection.execute("SELECT * FROM roles");
        return rows;
    }

    async createRole(role) {
        const connection = await mysql2.createConnection(this.env);
        const [result] = await connection.execute(
            "INSERT INTO roles (name) VALUES (?)",
            [role.name]
        );
        return result;
    }

    async updateRole(role) {
        const connection = await mysql2.createConnection(this.env);
        const [result] = await connection.execute(
            "UPDATE roles SET name = ? WHERE id = ?",
            [role.name, role.id]
        );
        return result;
    }

    async deleteRole(roleId) {
        // Se espera solo el ID del rol
        const connection = await mysql2.createConnection(this.env);
        const [result] = await connection.execute(
            "DELETE FROM roles WHERE id = ?",
            [roleId]
        );
        return result;
    }

    // Métodos para usuarios
    async getUsers() {
        const connection = await mysql2.createConnection(this.env);
        const [rows] = await connection.execute("SELECT * FROM users");
        return rows;
    }

    async createUser(user) {
        const connection = await mysql2.createConnection(this.env);
        const [result] = await connection.execute(
            "INSERT INTO users (username, roleID) VALUES (?, ?)",
            [user.name, user.roleID]
        );
        return result;
    }

    async updateUser(user) {
        const connection = await mysql2.createConnection(this.env);
        const [result] = await connection.execute(
            "UPDATE users SET username = ?, roleID = ? WHERE ID = ?",
            [user.name, user.roleID, user.ID]
        );
        return result;
    }

    async deleteUser(userId) {
        const connection = await mysql2.createConnection(this.env);
        // Se espera solo el ID del usuario
        const [result] = await connection.execute(
            "DELETE FROM users WHERE ID = ?",
            [userId]
        );
        return result;
    }

    // Métodos para acciones de rol
    async getRoleActions() {
        const connection = await mysql2.createConnection(this.env);
        const [rows] = await connection.execute(
            "SELECT * FROM roleActions"
        );
        return rows;
    }

    async createRoleAction(roleAction) {
        const connection = await mysql2.createConnection(this.env);
        const [result] = await connection.execute(
            "INSERT INTO roleActions (actionname, roleID) VALUES (?, ?)",
            [roleAction.actionname, roleAction.roleID]
        );
        return result;
    }

    async updateRoleAction(roleAction) {
        const connection = await mysql2.createConnection(this.env);
        const [result] = await connection.execute(
            "UPDATE roleActions SET actionname = ?, roleID = ? WHERE ID = ?",
            [roleAction.actionname, roleAction.roleID, roleAction.ID]
        );
        return result;
    }

    async deleteRoleAction(roleActionId) {
        // Se espera solo el ID de la acción de rol
        const connection = await mysql2.createConnection(this.env);
        const [result] = await connection.execute(
            "DELETE FROM roleActions WHERE ID = ?",
            [roleActionId]
        );
        return result;
    }

    async close() {
        const connection = await mysql2.createConnection(this.env);
        await connection.end();
    }
}

module.exports = MysqlRepository;

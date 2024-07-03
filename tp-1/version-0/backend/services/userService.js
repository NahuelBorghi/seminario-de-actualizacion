const MysqlRepository = require("../repositories/mysqlRepository.js");

class UserService {
    constructor() {}

    async getUsers() {
        const mysqlRepository = new MysqlRepository();
        return mysqlRepository.getUsers();
    }

    async createUser(user) {
        const mysqlRepository = new MysqlRepository();
        return mysqlRepository.createUser(user);
    }

    async updateUser(user) {
        const mysqlRepository = new MysqlRepository();
        return mysqlRepository.updateUser(user);
    }

    async deleteUser(userId) {
        const mysqlRepository = new MysqlRepository();
        return mysqlRepository.deleteUser(userId); // Corrección: Se pasa el ID del usuario
    }
}

module.exports = UserService;

const MysqlRepository = require("../repositories/mysqlRepository.js");

class actionService {
    constructor() {}

    async getRoleActions() {
        const mysqlRepository = new MysqlRepository();
        return mysqlRepository.getRoleActionsgetRoleActions();
    }

    async createRoleAction(roleAction) {
        const mysqlRepository = new MysqlRepository();
        return mysqlRepository.createRoleAction(roleAction);
    }

    async updateRoleAction(roleAction) {
        const mysqlRepository = new MysqlRepository();
        return mysqlRepository.updateRoleAction(roleAction);
    }

    async deleteRoleAction(roleAction) {
        const mysqlRepository = new MysqlRepository();
        return mysqlRepository.deleteRoleAction(roleAction);
    }
}

module.exports = actionService;

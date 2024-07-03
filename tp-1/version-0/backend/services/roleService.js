const MysqlRepository = require('../repositories/mysqlRepository.js');

class roleService {
  constructor() {
  }

  async getRoles() {
    const mysqlRepository = new MysqlRepository();
    return mysqlRepository.getRoles();
  }

  async createRole(role) {
    const mysqlRepository = new MysqlRepository();
    return mysqlRepository.createRole(role);
  }

  async updateRole(role) {
    const mysqlRepository = new MysqlRepository();
    return mysqlRepository.updateRole(role);
  }

  async deleteRole(roleId) {
    const mysqlRepository = new MysqlRepository();
    return mysqlRepository.deleteRole(roleId);
  }
}

module.exports = roleService;
const generateId = require('../utils/UUID.js');

class User {
    constructor(userName, password, email, Roles_id, state = true, id = null) {
        this.id = id || generateId();
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.state = state;
        this.Roles_id = Roles_id;
    }
}

module.exports = User;
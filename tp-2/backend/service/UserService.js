const BaseException = require('../exceptions/BaseException');
const MySqlRepository = require('../repository/MySqlRepository');
const { verifyHash } = require('../utils/hash');

class UserService {
    constructor() {
        console.time('UserService setup');
        this.mysqlRepository = new MySqlRepository();
        console.timeLog('UserService setup', 'MySqlRepository setup complete');
        console.timeEnd('UserService setup');
    }

    async createUser(userName, password, email) {
        try {
            return await this.mysqlRepository.createUser(userName, password, email);
        } catch (error) {
            throw new BaseException(`createUserService: ${error.message}`, 400, "Bad Request", "UserCreationError");
        }
    }
    
    async logInUser(userName, password) {
        try {
            const user = await this.mysqlRepository.getUserByUserName(userName);
            if (!user) {
                throw new BaseException('User not found', 404, "Not Found", "UserNotFoundError");
            } else if (!verifyHash(password, user.password)) {
                throw new BaseException(`Invalid password`, 401, "Bad Request", "UserLoginError");
            }
            const userLogged = await this.mysqlRepository.updateUserState(user.id, true);
            return userLogged
        } catch (error) {
            throw new BaseException(`loginUserService: ${error.message}`, error.statusCode??400, "Bad Request", "UserLoginError");
        }
    }

    async logOutUser(idUser) {
        try {
            const user = await this.mysqlRepository.getUserById(idUser);
            if (!user.userName) {
                throw new BaseException('User not found', 404, "Not Found", "UserNotFoundError");
            } 
            const userLogged = await this.mysqlRepository.updateUserState(user.id, 0);
            return userLogged
        } catch (error) {
            throw new BaseException(`logoutUserService: ${error.message}`, error.statusCode??400, "Bad Request", "UserLogoutError");
        }
    }

    async updateUser(id, userName, state, roleId) {
        try {
            return await this.mysqlRepository.updateUser(id, userName, state, roleId);
        } catch (error) {
            throw new BaseException(`updateUserService: ${error.message}`, error.statusCode??400, "Bad Request", "UserUpdateError");
        }
    }

    async getAllUsers() {
        try {
            return await this.mysqlRepository.getAllUsers();
        } catch (error) {
            throw new BaseException(`getAllUsersService: ${error.message}`, error.statusCode??400, error.stack??"Bad Request", "UserNotFoundError");
        }
    }

    async getUserById(id) {
        try {
            return await this.mysqlRepository.getUserById(id);
        } catch (error) {
            throw new BaseException(`getUserByIdService: ${error.message}`, error.statusCode??400, error.stack??"Bad Request", "UserNotFoundError");
        }
    }

    async getUserByUserName(userName) {
        try {
            return await this.mysqlRepository.getUserByUserName(userName);
        } catch (error) {
            throw new BaseException(`getUserByUserNameService: ${error.message}`, error.statusCode??400, error.stack??"Bad Request", "UserNotFoundError");
        }
    }

    async deleteUser(id) {
        try {
            return await this.mysqlRepository.deleteUser(id);
        } catch (error) {
            throw new BaseException(`deleteUserService: ${error.message}`, error.statusCode??400, error.stack??"Bad Request", "UserNotFoundError");
        }
    }
}

module.exports = UserService;
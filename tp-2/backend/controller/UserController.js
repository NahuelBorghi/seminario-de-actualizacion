const BaseException = require('../exceptions/BaseException');
const UserService = require('../service/UserService');
const { generateToken } = require('../utils/jwt');

class UserController {
    constructor() {
        const label = `-------------------- UserController setup - ${Date.now()}`;
        console.time(label);
        this.userService = new UserService();
        console.timeLog(label, 'UserService setup complete');
        console.timeEnd(label);
    }
    async create(req, res) {
        const label = `-------------------- User creation - ${Date.now()}`;
        console.time(label);
        try {
            const { userName, password, email, state, Roles_id } = req.body;
            await this.userService.createUser(userName, password, email, state, Roles_id);
            console.timeLog(label, "user created successfully");
            console.timeEnd(label);
            return res.status(201).send({ message: "User created successfully" });
        } catch (error) {
            console.timeEnd(label);
            throw new BaseException(`UserController.create: ${error.message}`, error.statusCode??400, "Bad Request", "UserCreationError");
        }
    }
    async login(req, res) {
        const label = `-------------------- User login - ${Date.now()}`;
        console.time(label);
        try {
            const { userName, password} = req.body;
            const user = await this.userService.logInUser(userName, password);
            const token = await generateToken(user);
            console.timeLog(label, "user logged in successfully");
            console.timeEnd(label);
            return res
                .cookie('Authentication', token, { httpOnly: false, path: '/', sameSite: 'Lax', maxAge: 60*60*24*1000 })  // 60 segundos * 60 minutos * 1 hora * 1000 milisegundos
                .send({ userID: user.id, userName: user.name });
        } catch (error) {
            console.timeEnd(label)
            throw new BaseException(`UserController.login: ${error.message}`, error.statusCode??400, "Bad Request", "UserLoginError");
        }
    }

    async updateUser(req, res) {
        const label = `-------------------- User update - ${Date.now()}`;
        console.time(label);
        try {
            const { id } = req.params;
            const { userName, state, Roles_id } = req.body;
            await this.userService.updateUser(id, userName, state, Roles_id);
            console.timeLog(label, "user updated successfully");
            console.timeEnd(label);
            return res.status(200).send({ message: 'User updated successfully' });
        } catch (error) {
            console.timeEnd(label)
            throw new BaseException(`UserController.updateUser: ${error.message}`, error.statusCode??400, "Bad Request", "UserUpdateError");
        }
    }

    async logout(req, res) {
        const label = `-------------------- User logout - ${Date.now()}`;
        console.time(label);
        try {
            const { id } = req.user;
            await this.userService.logOutUser(id);
            console.timeLog(label, "user logged out successfully");
            console.timeEnd(label);
            return res.status(200).clearCookie('Authentication').send({ message: 'User logged out' });
        } catch (error) {
            console.timeEnd(label)
            throw new BaseException(`UserController.logout: ${error.message}`, error.statusCode??400, "Bad Request", "UserLogoutError");
        }
    }
    
    async getUserById(req, res) {
        const label = `-------------------- Get user by ID - ${Date.now()}`;
        console.time(label);
        try {
            const { id } = req.query;
            const user = await this.userService.getUserById(id);
            console.timeLog(label, "user found successfully");
            console.timeEnd(label);
            return res.status(200).send(user);
        } catch (error) {
            console.timeEnd(label)
            throw new BaseException(`UserController.getUserById: ${error.message}`, error.statusCode??400, "Bad Request", "UserGetError");
        }
    }

    async getAllUsers(req, res) {
        const label = `-------------------- Get all users - ${Date.now()}`;
        console.time(label);
        try {
            const users = await this.userService.getAllUsers();
            console.timeLog(label, "users found successfully");
            console.timeEnd(label);
            return res.status(200).send(users);
        } catch (error) {
            console.timeEnd(label)
            throw new BaseException(`UserController.getAllUsers: ${error.message}`, error.statusCode ?? 400, "Bad Request", "UsersGetError");
        }
    }

    async deleteUser(req, res) {
        const label = `-------------------- Delete user - ${Date.now()}`;
        console.time(label);
        try {
            const { id } = req.params;
            await this.userService.deleteUser(id);
            console.timeLog(label, "user deleted successfully");
            console.timeEnd(label);
            return res.status(200).send({ message: 'User deleted successfully' });
        } catch (error) {
            console.timeEnd(label)
            throw new BaseException(`UserController.deleteUser: ${error.message}`, error.statusCode??400, "Bad Request", "UserDeleteError");
        }
    }
}

module.exports = UserController;
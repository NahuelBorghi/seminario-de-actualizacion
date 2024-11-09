// // Routes for UserController
const UserRoutes = require("express").Router();
const UserController = require("../controller/UserController.js");
const userController = new UserController();

UserRoutes.post("/register", async (req, res, next) => {
    try {
        await userController.create(req, res);
    } catch (error) {
        next(error);
    }
});

UserRoutes.post("/login", async (req, res, next) => {
    try {
        await userController.login(req, res);
    } catch (error) {
        next(error);
    }
});

UserRoutes.put("/:id", async (req, res, next) => {
    try {
        await userController.updateUser(req, res);
    } catch (error) {
        next(error);
    }
});

UserRoutes.post("/logout", async (req, res, next) => {
    try {
        await userController.logout(req, res);
    } catch (error) {
        next(error);
    }
});

UserRoutes.delete("/", async (req, res, next) => {
    try {
        await UserController.deleteUser(req, res);
    } catch (error) {
        next(error);
    }
});

UserRoutes.get("/userById", async (req, res, next)=>{
    try{
        await userController.getUserById(req, res);
    } catch (error){
        next(error);
    }
})

UserRoutes.get("/allUsers", async (req, res, next)=>{
    try{
        await userController.getAllUsers(req, res);
    } catch (error){
        next(error);
    }
})

module.exports = UserRoutes;
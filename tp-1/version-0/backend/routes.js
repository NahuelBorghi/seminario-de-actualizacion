const MainController = require("./controllers/mainController");
const routes = require("express").Router();

// Creamos una instancia del controlador
const mainController = new MainController();

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     responses:
 *       200:
 *         description: List of roles
 */
routes.get("/roles", (req, res) => mainController.getRoles(req, res));

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     responses:
 *       201:
 *         description: Role created
 */
routes.post("/roles", (req, res) => mainController.createRole(req, res));

/**
 * @swagger
 * /roles:
 *   put:
 *     summary: Update a role
 *     responses:
 *       200:
 *         description: Role updated
 */
routes.put("/roles", (req, res) => mainController.updateRole(req, res));

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role deleted
 */
routes.delete("/roles/:id", (req, res) => mainController.deleteRole(req, res));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
routes.get("/users", (req, res) => mainController.getUsers(req, res));

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     responses:
 *       201:
 *         description: User created
 */
routes.post("/users", (req, res) => mainController.createUser(req, res));

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update a user
 *     responses:
 *       200:
 *         description: User updated
 */
routes.put("/users", (req, res) => mainController.updateUser(req, res));

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted
 */
routes.delete("/users/:id", (req, res) => mainController.deleteUser(req, res));

/**
 * @swagger
 * /roleActions:
 *   get:
 *     summary: Get all role actions
 *     responses:
 *       200:
 *         description: List of role actions
 */
routes.get("/roleActions", (req, res) =>
    mainController.getRoleActions(req, res)
);

/**
 * @swagger
 * /roleActions:
 *   post:
 *     summary: Create a new role action
 *     responses:
 *       201:
 *         description: Role action created
 */
routes.post("/roleActions", (req, res) =>
    mainController.createRoleAction(req, res)
);

/**
 * @swagger
 * /roleActions:
 *   put:
 *     summary: Update a role action
 *     responses:
 *       200:
 *         description: Role action updated
 */
routes.put("/roleActions", (req, res) =>
    mainController.updateRoleAction(req, res)
);

/**
 * @swagger
 * /roleActions/{id}:
 *   delete:
 *     summary: Delete a role action
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role action deleted
 */
routes.delete("/roleActions/:id", (req, res) =>
    mainController.deleteRoleAction(req, res)
);

module.exports = routes;

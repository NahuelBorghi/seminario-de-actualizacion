const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 8080;

// Configuración de la base de datos
const env = {
    host: process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USER || "root",
    password: process.env.MYSQL_ROOT_PASSWORD || "matiasGASTONsantiago",
    database: process.env.MYSQL_DATABASE || "diagnostico",
};

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description:
                "API for managing users, groups, actions, and permissions",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./routes.js"], // Adjust the path as needed
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Usar routes para las rutas de la API
app.use("/AccountList", routes);

app.listen(port, () => {
    console.log(`Servidor backend escuchando en el puerto ${port}`);
});

const http = require("http");

const express = require("express");

const status = require("http-status");

const essenciasRoute = require('./routes/essencias');

const sequelize = require('./database/database');

const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json());

app.use("/api", essenciasRoute);

app.use((request, response, next) => {
    response.status(status.NOT_FOUND).send();
});

app.use((error, request, response, next) => {
    response.status(status.INTERNAL_SERVER_ERROR).json({ error });
});



sequelize.sync({ force: false }).then(() => {
    const port = process.env.PORT || 3000;

    app.set("port", port);

    const server = http.createServer(app);

    server.listen(port);
});

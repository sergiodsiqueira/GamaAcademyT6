const express = require("express");
const cors = require("cors");

const app = express();

//Ativação dos Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());

//Importação das Rotas:
const index = require("./routes/index");
const routesAuth = require("./routes/autenticacao.route");
const routesUsuario = require("./routes/usuario.route");
const routesPaciente = require("./routes/paciente.route");
const routesAtendimento = require("./routes/atendimento.route");
const routesDashboard = require("./routes/dashboard.route");

//Rotas
app.use(index);
app.use("/api/", routesAuth);
app.use("/api/", routesUsuario);
app.use("/api/", routesPaciente);
app.use("/api/", routesAtendimento);
app.use("/api/", routesDashboard);

module.exports = app;

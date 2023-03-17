const router = require("express-promise-router")();
const dashboardController = require("../controllers/dashboard.controller");
const rule = require("../config/jwt");

router.get("/dashboard/1/:ano", rule.JWT, dashboardController.graficoQtdeAtendimentoPorMes);

module.exports = router;
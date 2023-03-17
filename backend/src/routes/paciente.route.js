const router = require("express-promise-router")();
const pacienteController = require("../controllers/paciente.controller");
const rule = require("../config/jwt");

router.post("/pacientes", rule.JWT, pacienteController.adicionar);
router.get("/pacientes", rule.JWT, pacienteController.listarTodos);
router.get("/pacientes/:id", rule.JWT, pacienteController.listarUnico);
router.put("/pacientes/:id", rule.JWT, pacienteController.atualizar);
router.delete("/pacientes/:id", rule.JWT, pacienteController.apagar);

module.exports = router;

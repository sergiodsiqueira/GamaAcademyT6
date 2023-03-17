const router = require("express-promise-router")();
const atendimentoController = require("../controllers/atendimento.controller");
const rule = require("../config/jwt");

router.post("/atendimentos", rule.JWT, atendimentoController.adicionar);
router.get("/atendimentos", rule.JWT, atendimentoController.listarTodos);
router.get("/atendimentos/data", rule.JWT, atendimentoController.listarTodosPorData);
router.get("/atendimentos/paciente", rule.JWT, atendimentoController.listarPorPaciente);
router.get("/atendimentos/:id", rule.JWT, atendimentoController.listarUnico);
router.put("/atendimentos/:id", rule.JWT, atendimentoController.atualizar);
router.delete("/atendimentos/:id", rule.JWT, atendimentoController.apagar);

module.exports = router;
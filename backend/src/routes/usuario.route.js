const router = require("express-promise-router")();
const usuarioController = require("../controllers/usuario.controller");
const rule = require("../config/jwt");

router.post("/usuarios", rule.JWT, usuarioController.adicionar);
router.get("/usuarios", rule.JWT, usuarioController.listarTodos);
router.get("/usuarios/:id", rule.JWT, usuarioController.listarUnico);
router.put("/usuarios/:id", rule.JWT, usuarioController.atualizar);
router.delete("/usuarios/:id", rule.JWT, usuarioController.apagar);

module.exports = router;

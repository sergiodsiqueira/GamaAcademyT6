const express = require("express");

const router = express.Router();

var dataHora = new Date();
router.get("/", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "Bem-vindo a API e-Clinic " + dataHora.toLocaleDateString("pt-BR"),
    version: "1.0.0",
  });
});

module.exports = router;

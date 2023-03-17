const router = require("express-promise-router")();
const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;

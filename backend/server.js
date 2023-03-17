const app = require("./src/app");

const port = process.env.PORT || 8080;

//Iniciando servidor
app.listen(port, () => console.log(`API e-Clinic escutando a porta: ${port}`));

const db = require("../config/database");
const cUsuario = require("../models/usuario.model");

//C(Commit)RUD -------------------------------------------------------------------------------------
exports.adicionar = async (req, res) => {
  const { login, senha, tipo, id_cliente } = req.body;
  
  oUsuario = new cUsuario();
  oUsuario.login = login;
  oUsuario.senha = senha;
  oUsuario.tipo = tipo;
  oUsuario.id_cliente = id_cliente;
  
  let validacao = await oUsuario.gravar();
    
  if(validacao.sucesso){
    res.status(201).send(validacao.msg);
  } else {
    res.status(500).send(validacao.msg);
  }
};

//CR(Read)UD ---------------------------------------------------------------------------------------
exports.listarUnico = async (req, res) => {
  const id = parseInt(req.params.id);

  oUsuario = new cUsuario();
  await oUsuario.obter(id);
  if (oUsuario.id == 0){
    res.status(404).send('Usuário não encontrado');
  }

  res.status(200).send(oUsuario);
};

//CRU(Update)D -------------------------------------------------------------------------------------
exports.atualizar = async (req, res) => {
  const id = parseInt(req.params.id);
  const { login, senha, tipo, id_cliente } = req.body;

  oUsuario = new cUsuario();
  await oUsuario.obter(id);
  if (oUsuario.id == 0){
    res.status(404).send('Usuário não encontrado');
  }

  oUsuario.login = login;
  oUsuario.senha = senha;
  oUsuario.tipo = tipo;
  oUsuario.id_cliente = id_cliente;

  let validacao = await oUsuario.gravar();
    
  if(validacao.sucesso){
    res.status(201).send("Usuário alterado com sucesso");
  } else {
    res.status(500).send("Usuário não alterado");
  }
};

//CRUD(Delete) -------------------------------------------------------------------------------------
exports.apagar = async (req, res) => {
  const id = parseInt(req.params.id);

  oUsuario = new cUsuario();
  await oUsuario.obter(id);
  if (oUsuario.login == ''){
    res.status(404).send('Usuário não encontrado');  
  }
  let validacao = await oUsuario.apagar();

  if(validacao.sucesso){
    res.status(201).send(validacao.msg);
  } else {
    res.status(500).send(validacao.msg);
  }
};

//Listar todos os usuários -------------------------------------------------------------------------
exports.listarTodos = async (req, res) => {
  const response = await db.query(
    "SELECT * FROM usuarios ORDER BY id ASC"
  );
  res.status(200).send(response.rows);
};
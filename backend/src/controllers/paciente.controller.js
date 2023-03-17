const db = require("../config/database");
const cPaciente = require("../models/paciente.model");

//C(Commit)RUD -------------------------------------------------------------------------------------
exports.adicionar = async (req, res) => {
  const { nome, email, data_nascimento, 
          telefone_principal, telefone_secundario,
          end_logradouro, end_bairro, end_cidade, end_estado, end_cep, end_pais,
          doc_cpf, doc_rg,
          redesocial_1, redesocial_2, observacoes } = req.body;
   
  oPaciente = new cPaciente();
  oPaciente.nome = nome;
  oPaciente.email = email;
  oPaciente.data_nascimento = data_nascimento;
  oPaciente.telefone_principal = telefone_principal;
  oPaciente.telefone_secundario = telefone_secundario;
  oPaciente.end_logradouro = end_logradouro;
  oPaciente.end_bairro = end_bairro;
  oPaciente.end_cidade = end_cidade;
  oPaciente.end_estado = end_estado;
  oPaciente.end_cep = end_cep;
  oPaciente.end_pais = end_pais;
  oPaciente.doc_cpf = doc_cpf;
  oPaciente.doc_rg = doc_rg;
  oPaciente.redesocial_1 = redesocial_1;
  oPaciente.redesocial_2 = redesocial_2;
  oPaciente.observacoes = observacoes;

  let validacao = await oPaciente.gravar();
    
  if(validacao.sucesso){
    res.status(201).send(validacao.msg);
  } else {
    res.status(500).send(validacao.msg);
  }
};

//CR(Read)UD ---------------------------------------------------------------------------------------
exports.listarUnico = async (req, res) => {
  const id = parseInt(req.params.id);

  oPaciente = new cPaciente();
  await oPaciente.obter(id);
  if (oPaciente.id == 0){
    res.status(404).send('Paciente não encontrado');
  }

  res.status(200).send(oPaciente);
};

//CRU(Update)D -------------------------------------------------------------------------------------
exports.atualizar = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email, data_nascimento, 
    telefone_principal, telefone_secundario,
    end_logradouro, end_bairro, end_cidade, end_estado, end_cep, end_pais,
    doc_cpf, doc_rg,
    redesocial_1, redesocial_2, observacoes } = req.body;

  oPaciente = new cPaciente();
  await oPaciente.obter(id);
  if (oPaciente.id == 0){
    res.status(404).send('Paciente não encontrado');
  }

  oPaciente.nome = nome;
  oPaciente.email = email;
  oPaciente.data_nascimento = data_nascimento;
  oPaciente.telefone_principal = telefone_principal;
  oPaciente.telefone_secundario = telefone_secundario;
  oPaciente.end_logradouro = end_logradouro;
  oPaciente.end_bairro = end_bairro;
  oPaciente.end_cidade = end_cidade;
  oPaciente.end_estado = end_estado;
  oPaciente.end_cep = end_cep;
  oPaciente.end_pais = end_pais;
  oPaciente.doc_cpf = doc_cpf;
  oPaciente.doc_rg = doc_rg;
  oPaciente.redesocial_1 = redesocial_1;
  oPaciente.redesocial_2 = redesocial_2;
  oPaciente.observacoes = observacoes;

  let validacao = await oPaciente.gravar();
    
  if(validacao.sucesso){
    res.status(201).send("Paciente alterado com sucesso");
  } else {
    res.status(500).send("Paciente não alterado");
  }
};

//CRUD(Delete) -------------------------------------------------------------------------------------
exports.apagar = async (req, res) => {
  const id = parseInt(req.params.id);

  oPaciente = new cPaciente();
  await oPaciente.obter(id);
  if (oPaciente.id == 0){
    res.status(404).send('Paciente não encontrado');  
  }
  let validacao = await oPaciente.apagar();

  if(validacao.sucesso){
    res.status(201).send(validacao.msg);
  } else {
    res.status(500).send(validacao.msg);
  }
};

//Listar todos os Pacientes-------------------------------------------------------------------------
exports.listarTodos = async (req, res) => {
  const response = await db.query(
    "SELECT * FROM pacientes ORDER BY id ASC"
  );
  res.status(200).send(response.rows);
};
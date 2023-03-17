const db = require("../config/database");
const cAtendimento = require("../models/atendimento.model");

//C(Commit)RUD -------------------------------------------------------------------------------------
exports.adicionar = async (req, res) => {
    const { id_paciente, data, hora_inicio, hora_fim,
        descricao, observacao,
        confirmado, efetivado,
        valor, pago,
        id_tipo } = req.body;

    oAtendimento = new cAtendimento();
    oAtendimento.id_paciente = id_paciente;
    oAtendimento.data = data;
    oAtendimento.hora_inicio = hora_inicio;
    oAtendimento.hora_fim = hora_fim;
    oAtendimento.descricao = descricao;
    oAtendimento.observacao = observacao;
    oAtendimento.confirmado = confirmado;
    oAtendimento.efetivado = efetivado;
    oAtendimento.valor = valor;
    oAtendimento.pago = pago;
    oAtendimento.id_tipo = id_tipo;

    let validacao = await oAtendimento.gravar();

    if (validacao.sucesso) {
        res.status(201).send(validacao.msg);
    } else {
        res.status(500).send(validacao.msg);
    }
};

//CR(Read)UD ---------------------------------------------------------------------------------------
exports.listarUnico = async (req, res) => {
    const id = parseInt(req.params.id);

    oAtendimento = new cAtendimento();
    await oAtendimento.obter(id);
    if (oAtendimento.id == 0) {
        res.status(404).send('Atendimento não encontrado');
    }

    res.status(200).send(oAtendimento);
};

//CRU(Update)D -------------------------------------------------------------------------------------
exports.atualizar = async (req, res) => {
    const id = parseInt(req.params.id);
    const { id_paciente, data, hora_inicio, hora_fim,
        descricao, observacao,
        confirmado, efetivado,
        valor, pago,
        id_tipo } = req.body;

    oAtendimento = new cAtendimento();
    await oAtendimento.obter(id);
    if (oAtendimento.id == 0) {
        res.status(404).send('Atendimento não encontrado');
    }

    oAtendimento.id = id;
    oAtendimento.id_paciente = id_paciente;
    oAtendimento.data = data;
    oAtendimento.hora_inicio = hora_inicio;
    oAtendimento.hora_fim = hora_fim;
    oAtendimento.descricao = descricao;
    oAtendimento.observacao = observacao;
    oAtendimento.confirmado = confirmado;
    oAtendimento.efetivado = efetivado;
    oAtendimento.valor = valor;
    oAtendimento.pago = pago;
    oAtendimento.id_tipo = id_tipo;

    let validacao = await oAtendimento.gravar();

    if (validacao.sucesso) {
        res.status(201).send("Atendimento alterado com sucesso");
    } else {
        res.status(500).send("Atendimento não alterado");
    }
};

//CRUD(Delete) -------------------------------------------------------------------------------------
exports.apagar = async (req, res) => {
    const id = parseInt(req.params.id);

    oAtendimento = new cAtendimento();
    await oAtendimento.obter(id);
    if (oAtendimento.id == 0) {
        res.status(404).send('Atendimento não encontrado');
    }
    await oAtendimento.apagar();

    await oAtendimento.obter(id);
    if (oAtendimento.id == 0){
        res.status(201).send(`Atendimento ${id} excluído com sucesso`);
    } else {
        res.status(500).send('Atendimento NÃO excluído, porque já foi efetivado');
    }
};

//Listar todos os Atendimentos ---------------------------------------------------------------------
exports.listarTodos = async (req, res) => {
    const response = await db.query(
        "SELECT A.*, P.nome FROM atendimentos A LEFT JOIN pacientes P ON A.id_paciente = P.id ORDER BY A.data, A.hora_inicio ASC"
    );
    res.status(200).send(response.rows);
};

//Listar Atendimentos por Data ---------------------------------------------------------------------
exports.listarTodosPorData = async (req, res) => {
    const pData = new Date(req.query.data);
    const response = await db.query(
        "SELECT A.*, P.nome FROM atendimentos A LEFT JOIN pacientes P ON A.id_paciente = P.id WHERE A.data = $1 ORDER BY A.hora_inicio ASC",
        [pData]
    );

    if (response.rowCount > 0){
        res.status(200).send(response.rows);
    } else {
        res.status(404).send('Data informada de forma incorreta tente no padrão ISO (yyyy-mm-dd)');
    }
};

//Listar Atendimentos por Paciente -----------------------------------------------------------------
exports.listarPorPaciente = async (req, res) => {
    const pIdPaciente = req.query.id;
    const response = await db.query(
        "SELECT A.*, P.nome FROM atendimentos A LEFT JOIN pacientes P ON A.id_paciente = P.id WHERE A.id_paciente = $1 ORDER BY A.data ASC",
        [pIdPaciente]
    );

    if (response.rowCount > 0){
        res.status(200).send(response.rows);
    } else {
        res.status(404).send('Paciente não encontrado');
    }
};
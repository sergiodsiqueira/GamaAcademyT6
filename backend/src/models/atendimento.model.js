const { json } = require("express");
const db = require("../config/database");

module.exports = class Atendimento {
    #operacao;

    #limparCampos() {
        this.#operacao = 'I';
        this.id = 0;
        this.id_paciente = 0;
        this.nome_paciente = '';
        this.data = '';
        this.hora_inicio = '';
        this.hora_fim = '';
        this.descricao = '';
        this.observacao = '';
        this.confirmado = false;
        this.efetivado = false;
        this.valor = 0;
        this.pago = false;
        this.id_tipo = 0;        
    }

    constructor() {
        this.#limparCampos();
    }

    async obter(pID) {
        const res = await db.query(
            "SELECT A.*, P.nome FROM atendimentos A LEFT JOIN pacientes P ON A.id_paciente = P.id WHERE A.id = $1",
            [pID]
        );
        if (res.rows[0]) {
            this.#operacao = 'A';
            this.id = res.rows[0].id;
            this.id_paciente = res.rows[0].id_paciente;
            this.nome_paciente = res.rows[0].nome_paciente;
            this.data = res.rows[0].data;
            this.hora_inicio = res.rows[0].hora_inicio;
            this.hora_fim = res.rows[0].hora_fim;
            this.descricao = res.rows[0].descricao;
            this.observacao = res.rows[0].observacao;
            this.confirmado = res.rows[0].confirmado;
            this.efetivado = res.rows[0].efetivado;
            this.valor = res.rows[0].valor;
            this.pago = res.rows[0].pago;
            this.id_tipo = res.rows[0].id_tipo;            
        } else {
            this.#limparCampos();
        }

    }

    async gravar() {
        const validacao = this.validar();

        if (validacao.sucesso) {
            if (this.#operacao == 'I') {
                let SQL = 'INSERT INTO atendimentos ';
                SQL += '(id_paciente, data, hora_inicio, hora_fim, ';
                SQL += 'descricao, observacao, ';
                SQL += 'confirmado, efetivado, ';
                SQL += 'valor, pago, ';
                SQL += 'id_tipo )';
                SQL += 'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';

                await db.query(SQL,
                    [this.id_paciente, this.data, this.hora_inicio, this.hora_fim,
                    this.descricao, this.observacao,
                    this.confirmado, this.efetivado,
                    this.valor, this.pago,
                    this.id_tipo]
                );
                validacao.msg = 'Atendimento cadastrado com sucesso'
            }

            if (this.#operacao == 'A') {
                let SQL = 'UPDATE atendimentos SET ';
                SQL += 'id_paciente = $1, data = $2, hora_inicio = $3, hora_fim = $4, ';
                SQL += 'descricao = $5, observacao = $6, ';
                SQL += 'confirmado = $7, efetivado = $8, ';
                SQL += 'valor = $9, pago = $10, ';
                SQL += 'id_tipo = $11 WHERE id = $12';

                await db.query(SQL,
                    [this.id_paciente, this.data, this.hora_inicio, this.hora_fim,
                    this.descricao, this.observacao,
                    this.confirmado, this.efetivado,
                    this.valor, this.pago,
                    this.id_tipo, this.id]
                );
                validacao.msg = 'Atendimento alterado com sucesso'
            }
            return validacao;
        } else {
            return validacao;
        }
    }

    async apagar() {
        if (this.#operacao == 'A') {
            const resultado = await db.query(
                "DELETE FROM atendimentos WHERE id = $1 AND efetivado = false",
                [this.id]
            );
            let validacao = { sucesso: true, msg: `Atendimento ${this.id} excluído com sucesso` };

            this.#limparCampos();

            return validacao
        } else {
            return { sucesso: false, msg: "Entre no modo de alteração" }
        }
    }

    validar() {
        if (this.#operacao != 'I') {
            if ((this.id <= 0) || (!this.id)) {
                return { sucesso: false, msg: "Id inválido" }
            }
        }

        console.log(this.data)
        if ((this.data == '')) {
            return { sucesso: false, msg: "Data do agendamento inválido" }
        }

        if ((this.descricao.length <= 3) || (this.nome == '')) {
            return { sucesso: false, msg: "Descrição do agendamento inválido" }
        }

        if (this.hora_inicio == '') {
            return { sucesso: false, msg: "Horário inicial inválido" }
        }
        if (this.hora_fim == '') {
            return { sucesso: false, msg: "Horário final inválido" }
        }

        return { sucesso: true, msg: "Dados OK" }
    }
};
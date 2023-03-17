const { json } = require("express");
const db = require("../config/database");

module.exports = class Paciente {
    #operacao;

    #limparCampos() {
        this.#operacao = 'I';
        this.id = 0;
        this.nome = '';
        this.email = '';
        this.data_nascimento = '';
        this.telefone_principal = '';
        this.telefone_secundario = '';
        this.end_logradouro = '';
        this.end_bairro = '';
        this.end_cidade = '';
        this.end_estado = '';
        this.end_cep = '';
        this.end_pais = '';
        this.doc_cpf = '';
        this.doc_rg = '';
        this.redesocial_1 = '';
        this.redesocial_2 = '';
        this.observacoes = '';
    }

    constructor() {
        this.#limparCampos();
    }

    async obter(pID) {
        const res = await db.query(
            "SELECT * FROM pacientes WHERE id = $1",
            [pID]
        );
        if (res.rows[0]) {
            this.#operacao = 'A';
            this.id = res.rows[0].id;
            this.nome = res.rows[0].nome;
            this.email = res.rows[0].email;
            this.data_nascimento = res.rows[0].data_nascimento;
            this.telefone_principal = res.rows[0].telefone_principal;
            this.telefone_secundario = res.rows[0].telefone_secundario;
            this.end_logradouro = res.rows[0].end_logradouro;
            this.end_bairro = res.rows[0].end_bairro;
            this.end_cidade = res.rows[0].end_cidade;
            this.end_estado = res.rows[0].end_estado;
            this.end_cep = res.rows[0].end_cep;
            this.end_pais = res.rows[0].end_pais;
            this.doc_cpf = res.rows[0].doc_cpf;
            this.doc_rg = res.rows[0].doc_rg;
            this.redesocial_1 = res.rows[0].redesocial_1;
            this.redesocial_2 = res.rows[0].redesocial_2;
            this.observacoes = res.rows[0].observacoes;
        } else {
            this.#limparCampos();
        }

    }

    async gravar() {
        const validacao = this.validar();

        if (validacao.sucesso) {
            if (this.#operacao == 'I') {
                let SQL = 'INSERT INTO pacientes ';
                SQL += '(nome, email, data_nascimento, ';
                SQL += 'telefone_principal, telefone_secundario, ';
                SQL += 'end_logradouro, end_bairro, end_cidade, end_estado, end_cep, end_pais, ';
                SQL += 'doc_cpf, doc_rg, ';
                SQL += 'redesocial_1, redesocial_2, ';
                SQL += 'observacoes)';
                SQL += 'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)';
                
                await db.query(SQL,
                    [this.nome, this.email, this.data_nascimento,
                    this.telefone_principal, this.telefone_secundario,
                    this.end_logradouro, this.end_bairro, this.end_cidade, this.end_estado, this.end_cep, this.end_pais,
                    this.doc_cpf, this.doc_rg,
                    this.redesocial_1, this.redesocial_2,
                    this.observacoes]
                );
                validacao.msg = 'Paciente cadastrado com sucesso'
            }

            if (this.#operacao == 'A') {
                let SQL = 'UPDATE pacientes SET ';
                SQL += 'nome = $1, email = $2, data_nascimento = $3, ';
                SQL += 'telefone_principal = $4, telefone_secundario = $5, ';
                SQL += 'end_logradouro = $6, end_bairro = $7, end_cidade = $8, end_estado = $9, end_cep = $10, end_pais = $11, ';
                SQL += 'doc_cpf = $12, doc_rg = $13, ';
                SQL += 'redesocial_1 = $14, redesocial_2 = $15, ';
                SQL += 'observacoes = $16 ';
                SQL += 'WHERE id = $17';
                await db.query(SQL,
                    [this.nome, this.email, this.data_nascimento,
                    this.telefone_principal, this.telefone_secundario,
                    this.end_logradouro, this.end_bairro, this.end_cidade, this.end_estado, this.end_cep, this.end_pais,
                    this.doc_cpf, this.doc_rg,
                    this.redesocial_1, this.redesocial_2,
                    this.observacoes, this.id]
                );
                validacao.msg = 'Paciente alterado com sucesso'
            }
            return validacao;
        } else {
            return validacao;
        }
    }

    async apagar() {
        if (this.#operacao == 'A') {
            await db.query(
                "DELETE FROM pacientes WHERE id = $1",
                [this.id]
            );
            let validacao = { sucesso: true, msg: `Paciente ${this.nome} excluido com sucesso` };

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

        console.log('Valida nome:'+this.nome);
        if ((this.nome.length <= 3) || (this.nome == '')) {
            return { sucesso: false, msg: "Nome do paciente inválido" }
        }

        if (!(validaEmail(this.email)) || (this.email == '')) {
            return { sucesso: false, msg: "Email do paciente inválido" }
        }

        return { sucesso: true, msg: "Dados OK" }
    }
};

function validaEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

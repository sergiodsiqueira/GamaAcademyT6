const { json } = require("express");
const db = require("../config/database");

module.exports = class Usuario {
  #operacao;

  constructor() {
    this.#operacao = 'I';
    this.id;
    this.login;
    this.senha;
    this.tipo;
    this.id_cliente;
  }

  async obter(pID) {
    const res = await db.query(
      "SELECT id, login, senha, tipo, id_cliente FROM usuarios WHERE id = $1",
      [pID]
    );
    if (res.rows[0]) {
      this.#operacao = 'A';
      this.id = res.rows[0].id;
      this.login = res.rows[0].login;
      this.senha = res.rows[0].senha;
      this.tipo = res.rows[0].tipo;
      this.id_cliente = res.rows[0].id_cliente;
    } else {
      this.#operacao = 'I';
      this.id = 0;
      this.login = '';
      this.senha = '';
      this.tipo = '';
      this.id_cliente = 0;
    }

  }

  async gravar() {
    const validacao = this.validar();

    if (validacao.sucesso) {
      if (this.#operacao == 'I') {
        await db.query(
          "INSERT INTO usuarios (login, senha, tipo, id_cliente) VALUES ($1, $2, $3, $4)",
          [this.login, this.senha, this.tipo, this.id_cliente]
        );
        validacao.msg = 'Usuário cadastrado com sucesso'
      }
      
      if (this.#operacao == 'A') {
        
        await db.query(
          "UPDATE usuarios SET login = $1, senha = $2, tipo = $3, id_cliente = $4 WHERE id = $5",
          [this.login, this.senha, this.tipo, this.id_cliente, this.id]
        );
        validacao.msg = 'Usuário alterado com sucesso'
      }
      return validacao;
    } else {
      return validacao;
    }
  }

  async apagar() {
    if (this.#operacao == 'A') {
      await db.query(
        "DELETE FROM usuarios WHERE id = $1",
        [this.id]
      );
      let validacao = { sucesso: true, msg: `Usuário ${this.login} excluido com sucesso` };

      this.#operacao = 'I';
      this.id = 0;
      this.login = '';
      this.senha = '';
      this.tipo = '';
      this.id_cliente = 0;

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

    if (!(validaEmail(this.login)) || (this.login == '')) {
      return { sucesso: false, msg: "Login inválido" }
    }

    if (this.senha.length <= 7) {
      return { sucesso: false, msg: "Senha menor que 8 caracteres" }
    }

    const reg = /A|U/; //Regex para teste entre A=Admin ou U=Usuário
    if (!reg.test(this.tipo)) {
      return { sucesso: false, msg: "Tipo inválido" }
    }

    if ((this.id_cliente > 0) || (this.id_cliente != '')) {
      //pesquisa se cliente existe na base
    }

    return { sucesso: true, msg: "Dados OK" }
  }
};

function validaEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

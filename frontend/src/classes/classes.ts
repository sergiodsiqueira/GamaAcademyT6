export enum EPermissao {
    admin = 'A',
    usuario = 'U'
}

export class Usuario {
    public id;
    public email;
    public senha;
    public permissao;
    public idProfissional;

    constructor(
        id: number,
        email: string,
        senha: string,
        permissao: EPermissao,
        idProfissional?: number) {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.permissao = permissao;
        this.idProfissional = idProfissional
    }
}

export class Profissional {
    public id;
    public nome;
    public crp;
    public telefone;
    public celular;
    public abordagem;

    constructor(
        id: number,
        nome: string,
        crp?: string,
        telefone?: string,
        celular?: string,
        abordagem?: string) {
        this.id = id;
        this.nome = nome;
        this.crp = crp;
        this.telefone = telefone;
        this.celular = celular;
        this.abordagem = abordagem;
    }
}
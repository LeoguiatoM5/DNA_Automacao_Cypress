import { faker } from "@faker-js/faker/locale/pt_BR";

const { registrarErrosJS } = require("../../pages/tratamentos/errosJS.js");
const {
  validarCampoSemMascara,
  validarCampoSemCase,
} = require("../../pages/tratamentos/validacoesCampos.js");

registrarErrosJS();

describe("Cadastro Grupo Distribuidor", () => {
  //Variáveis
const nomeGrupo = faker.company.name();

  beforeEach(() => {
    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Especialidades/Acesso.aspx"
    );
    cy.get("#ContentPlaceHolder1_Control_Login2_Login1_UserName").type(
      "admbayer@dnaspecialty.com.br"
    );
    cy.get("#ContentPlaceHolder1_Control_Login2_Login1_Password").type(
      "12345678"
    );
    cy.get("#ContentPlaceHolder1_Control_Login2_Login1_LoginButton").click();
  });

  function cadastroGrupo() {
    cy.get(':nth-child(5) > .sf-with-ul').click();
    cy.contains("Grupo de Distribuidor").click();
    cy.get('#ContentPlaceHolder1_btNovoMenu').click();
    cy.get('#ContentPlaceHolder1_txtDescricao').type(nomeGrupo);
    cy.get('.slider').click();
    cy.get('#ContentPlaceHolder1_btSalvar').click();
  }

  function buscaNovoGrupo() {
    cy.get('#ContentPlaceHolder1_TxtDesc').type(nomeGrupo);
    cy.get('#ContentPlaceHolder1_BtnProcurar').click();
    cy.get('.gridRow > :nth-child(3)'). should ("contain.text",nomeGrupo);
  }

  it ("Fluxo cadastro e busca de novo Grupo Distribuidor" , () => {
    cy.log("Cadastrando novo grupo");
    cadastroGrupo();

    cy.log("Buscando novo cadastro");
    buscaNovoGrupo();

  });

});

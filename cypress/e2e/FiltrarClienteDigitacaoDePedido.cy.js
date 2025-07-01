/// <reference types="cypress" />

const { registrarErrosJS } = require("../pages/tratamentos/errosJS");
const {
  validarCampoSemMascara,
  validarCampoSemCase,
} = require("../pages/tratamentos/validacoesCampos");

registrarErrosJS();

//cy.get(":nth-child(7) > .sf-with-ul").click();

describe("Caminho Feliz", () => {
  const Cpf = "04766562658";

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

  function filtrarCliente() {
    cy.get(":nth-child(7) > .sf-with-ul").click();
    cy.contains("Digitação de Pedido").click();
    cy.get("#ContentPlaceHolder1_txtFiltroCNPJ").type(Cpf);
    cy.get("#ContentPlaceHolder1_btnBuscarCliente").click();
    cy.wait(8000);
    cy.get(".gridRow > :nth-child(2)").should("contain.text", Cpf);
  }

  function politicaComercial() {
    cy.get('[accesskey="5"]').click();
    cy.contains("Condição Comercial").click();
    cy.wait(8000);
    cy.get("#ContentPlaceHolder1_ddlEmpresa").select("CARDIO");
  }

  it("Filtrar Cliente em Digitação de Pedidos", () => {
    filtrarCliente();
  });

  it("Validar Politica Comercial", () => {
    politicaComercial();
  });
});

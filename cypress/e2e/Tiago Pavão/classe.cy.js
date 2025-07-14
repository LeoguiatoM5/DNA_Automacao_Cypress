const { registrarErrosJS } = require("../../pages/tratamentos/errosJS.js");
const {
  validarCampoSemMascara,
  validarCampoSemCase,
} = require("../../pages/tratamentos/validacoesCampos.js");

registrarErrosJS();

describe("Fluxo após login válido", () => {
  before(() => {
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

  it("Cadastro Classe", () => {
    const nomedivisao = "TESTEDNA";

    cy.get(":nth-child(4) > .sf-with-ul").click();
    cy.contains("Classe").click();
    cy.get("#ContentPlaceHolder1_btNovo").click();
    cy.get("#ContentPlaceHolder1_txtCodigo").type("123");
    cy.get("#ContentPlaceHolder1_txtDescricao").type(nomedivisao);
    cy.get(":nth-child(2) > .switch > .slider").click();
    cy.get("#ContentPlaceHolder1_btSalvar").click();
    cy.get("#ContentPlaceHolder1_TxtDesc").type(nomedivisao);
    cy.get("#ContentPlaceHolder1_BtnProcurar").click();
    cy.get(".gridRow > :nth-child(3)").should("contain.text", nomedivisao);
  });
});

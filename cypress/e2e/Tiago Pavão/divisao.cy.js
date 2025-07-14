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

  it("Cadastro Divisão", () => {
    const nomedivisao = "Divisão Teste";

    cy.get(":nth-child(4) > .sf-with-ul").click();
    cy.contains("Divisão").click();
    cy.get("#ContentPlaceHolder1_Button1").click();
    cy.get("#ContentPlaceHolder1_txtDescricao").type(nomedivisao);
    cy.get("#ContentPlaceHolder1_ddlEmpresa").select("ONCO");
    cy.get(".slider").click();
    cy.get("#ContentPlaceHolder1_btSalvar").click();
    cy.get("#ContentPlaceHolder1_txtProdutoNomeFiltro").type(nomedivisao);
    cy.get("#ContentPlaceHolder1_BtnProcurar").click();
    cy.get("tbody > :nth-child(2) > :nth-child(3)").should(
      "contain.text",
      nomedivisao
    );
  });
});

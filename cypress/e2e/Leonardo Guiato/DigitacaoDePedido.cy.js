const {
  validarCampoSemMascara,
  validarCampoSemCase,
} = require("../../pages/tratamentos/validacoesCampos.js");

Cypress.on("uncaught:exception", () => false);

describe("Validação Cálculo Preço Líquido", () => {
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
  function clienteEproduto() {
    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Especialidades/Pedido/CriacaoEdicaoPedidoDesc.aspx?cod=12737884-A517-4E87-9AB1-42BB797CC1B5|2168"
    );

    cy.get("#ContentPlaceHolder1_txtFiltroCNPJ").type("28.528.533/0001-60");
    cy.get("#ContentPlaceHolder1_btnBuscarCliente").click();
    cy.get("#ajaxLoading", { timeout: 100000 }).should("not.be.visible");
    cy.get("#ContentPlaceHolder1_rptCliente_imgSelecionar_0").click();

    cy.get("#ContentPlaceHolder1_ddlSetor").select(
      "(OFTALMO) OC003 DOUGLAS CLAUDINO"
    );
    cy.get("#ContentPlaceHolder1_ddlCondicaoComercial").select(
      "MA_ESP_POLITICA COMERCIAL MARKET ACCESS INDIRETO 2025 2026 - JULHO"
    );

    cy.get("#ContentPlaceHolder1_rptProduto_txtQtdProduto_0").type(2);
    cy.get("#ContentPlaceHolder1_rptProduto_txtQtdProduto_1").type(3);
    cy.get("#ContentPlaceHolder1_btnProsseguirDistribuidor", {
      timeout: 4000,
    }).click();
    cy.get("#ContentPlaceHolder1_btnProsseguirDistribuidor", {
      timeout: 4000,
    }).click();
  }

  function Distribuidores() {
    cy.get("#ContentPlaceHolder1_rptDistribuidor_imgSelecionar_105").click();
    cy.get("#ContentPlaceHolder1_rptDistribuidor_imgSelecionar_106").click();
    cy.get("#ContentPlaceHolder1_btnProsseguirResumo");
  }

  it("Validacao UX Digitação de Pedido", () => {
    clienteEproduto();
    Distribuidores();
  });
});

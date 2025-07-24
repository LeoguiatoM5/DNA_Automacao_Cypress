const { registrarErrosJS } = require("../../pages/tratamentos/errosJS.js");
const {
  validarCampoSemMascara,
  validarCampoSemCase,
} = require("../../pages/tratamentos/validacoesCampos.js");

registrarErrosJS();

describe("Politica Comercial  e validação", () => {
  const CNPJ = "60995617000116";

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

  function cadastroPoliticaComercial() {
    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Especialidades/PoliticaCondicaoHTML/PoliticaComercial_Lista.aspx?cod=FAC586E9-5845-4798-92DC-99D238B66E6F|2179"
    );
    cy.get("#ContentPlaceHolder1_btnNova").click();
    cy.get("#ContentPlaceHolder1_ddlEmpresa").select("CARDIO");
    cy.get("#ContentPlaceHolder1_txtDescricao", { timeout: 4000 }).type(
      "teste dna specialty"
    );
    cy.get("#ContentPlaceHolder1_Calendario_txtDtInicio").type("05/05/2025");
    cy.get("#ContentPlaceHolder1_Calendario_txtDtFim").type("05/05/2027");
    cy.get("h1").click();
    cy.get("#ContentPlaceHolder1_ddlStatusInicial").select("PENDENTE ANÁLISE");
  }

  function cadastroCliente() {
    cy.get("#abaCliente-trigger").click();
    cy.get("#ContentPlaceHolder1_ddlRegiaoClientes").select("BRASIL");
    cy.get("#ContentPlaceHolder1_ddlEstadoCliente").select("SÃO PAULO");
    cy.get("#ContentPlaceHolder1_ddlCidadeCliente").select("SAOPAULO");
    cy.get("#ContentPlaceHolder1_txtCEPCliente").type("15550-000");
    cy.get("#ContentPlaceHolder1_txtCNPJCliente").type("60995617000116");
    cy.get("#ContentPlaceHolder1_btnAdicionarFiltro").click();
    cy.get(":nth-child(2) > .gridRow > :nth-child(2)").should(
      "contain.text",
      "Cidade (SAOPAULO); CEP (15550-000); CNPJ (60995617000116);"
    );
  }

  function cadastroProduto() {
    cy.get("#abaProduto-trigger").click();
    cy.get("#ContentPlaceHolder1_ddlFiltroDivisaoProdutos").select(
      "CARDIOLOGIA"
    );
    cy.get("#row1 > :nth-child(4) > #txtVolumeMinimo").type("2");
    cy.get("#row2 > :nth-child(4) > #txtVolumeMinimo").type("2");
  }

  function cadastroBonificacao() {
    cy.get("#abaBonificadoFamilia-trigger").click();

    cy.get(
      "#ContentPlaceHolder1_rptBonificacaoFamilia_txtVolumeMinimoFamilia_0"
    )
      .should("be.visible")
      .type("1", { delay: 100 });

    cy.get(
      "#ContentPlaceHolder1_rptBonificacaoFamilia_txtVolumeMinimoFamilia_1"
    )
      .should("be.visible")
      .type("1", { delay: 100 });

    cy.get(
      "#ContentPlaceHolder1_rptBonificacaoFamilia_txtVolumeMinimoFamilia_2"
    )
      .should("be.visible")
      .type("1", { delay: 100 });
  }

  it("Fluxo completo de cadastro de Politica Comercial", () => {
    cadastroPoliticaComercial();
    cadastroCliente();
    cadastroProduto();
    cadastroBonificacao();
  });
});

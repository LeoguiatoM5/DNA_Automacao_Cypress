import { faker } from "@faker-js/faker/locale/pt_BR";
import { cnpj } from "cpf-cnpj-validator";

Cypress.on("uncaught:exception", () => false);

const {
  validarCampoSemMascara,
  validarCampoSemCase,
  validarTextoVisivel,
} = require("../../pages/tratamentos/validacoesCampos.js");

const nomeEmpresa = faker.company.name();
const CNPJValido = cnpj.generate();

describe("Politica Comercial e validação", () => {
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
      nomeEmpresa
    );
    cy.get("#ContentPlaceHolder1_Calendario_txtDtInicio").type("05/05/2025");
    cy.get("#ContentPlaceHolder1_Calendario_txtDtFim").type("05/05/2027");
    cy.get("h1").click();
    cy.get("#ContentPlaceHolder1_ddlStatusInicial").select("PENDENTE ANÁLISE");
  }

  function cadastroCliente() {
    cy.get("#abaCliente-trigger").click();
    cy.get("#ContentPlaceHolder1_ddlRegiaoClientes").select("BRASIL");

    cy.intercept("POST", "**/PoliticaComercial_CriacaoEdicao.aspx**").as(
      "carregaCidades"
    );
    cy.get("#ContentPlaceHolder1_ddlEstadoCliente").select("SÃO PAULO");
    cy.wait("@carregaCidades");

    cy.get("#ContentPlaceHolder1_ddlCidadeCliente", { timeout: 10000 })
      .find("option")
      .should("contain.text", "SAOPAULO");

    cy.get("#ContentPlaceHolder1_ddlCidadeCliente").select("SAOPAULO");

    cy.get("#ContentPlaceHolder1_txtCEPCliente").type("15550-000");
    cy.get("#ContentPlaceHolder1_txtCNPJCliente").type(CNPJValido);
    cy.get("#ContentPlaceHolder1_btnAdicionarFiltro").click();

    cy.get(":nth-child(2) > .gridRow > :nth-child(2)", {
      timeout: 10000,
    }).should("contain.text", `CNPJ (${CNPJValido})`);
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
    cy.get("#abaBonificacaoFamilia", { timeout: 10000 }).should(
      "have.css",
      "display",
      "block"
    );
    cy.get(
      "#ContentPlaceHolder1_rptBonificacaoFamilia_txtVolumeMinimoFamilia_0"
    )
      .should("be.visible")
      .type("1", { delay: 100 });
  }

  function cadastroDistribuidor() {
    cy.get("#abaDistribuidor-trigger").click();
    cy.url().should("include", "PoliticaComercial_CriacaoEdicao.aspx");
    cy.get("#abaDistribuidor-trigger").click();

    cy.get("#abaDistribuidor", { timeout: 10000 }).should(
      "have.css",
      "display",
      "block"
    );

    cy.get("#ContentPlaceHolder1_rptDistribuidor_imgSelecionar_0", {
      timeout: 10000,
    })
      .should("be.visible")
      .click();

    cy.get("#ajaxLoading", { timeout: 60000 }).should("not.be.visible");

    cy.get("#ContentPlaceHolder1_rptDistribuidor_imgSelecionar_1", {
      timeout: 10000,
    })
      .should("be.visible")
      .click();

    cy.get("#ajaxLoading", { timeout: 60000 }).should("not.be.visible");

    cy.get("#ContentPlaceHolder1_btnSalvarFechar", { timeout: 10000 })
      .scrollIntoView()
      .should("be.visible")
      .click();
  }

  function validarPoliticaCadastrada() {
    cy.location("pathname", { timeout: 10000 }).should(
      "include",
      "PoliticaComercial_Lista.aspx"
    );

    cy.get(".gridRow", { timeout: 10000 }).should("exist");

    validarTextoVisivel(".gridRow > :nth-child(3)", nomeEmpresa);
  }

  it("Fluxo completo com dados dinâmicos", () => {
    cadastroPoliticaComercial();
    cadastroCliente();
    cadastroProduto();
    cadastroBonificacao();
    cadastroDistribuidor();
    validarPoliticaCadastrada();
  });
});

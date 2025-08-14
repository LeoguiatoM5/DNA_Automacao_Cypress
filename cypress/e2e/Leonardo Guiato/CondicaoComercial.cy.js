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

describe("Criação Comercial e validação", () => {
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

  function CadastroCondicaoComercial() {
    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Especialidades/PoliticaCondicaoHTML/CondicaoComercial_Lista.aspx?cod=3F44431E-0ECF-4390-87A3-B03EAB0D0F68|2163"
    );
    cy.get("#ContentPlaceHolder1_btnNova").click();
    cy.get("#ContentPlaceHolder1_txtDescricao", { timeout: 40000 }).type(
      nomeEmpresa
    );
    cy.get("#ContentPlaceHolder1_ddlPoliticaComercial", { timeout: 40000 })
      .should("be.visible")
      .select("21973");
    cy.get("#ContentPlaceHolder1_Calendario_txtDtInicio")
      .invoke("val", "23/07/2025")
      .trigger("change");

    cy.get("#ContentPlaceHolder1_Calendario_txtDtFim")
      .invoke("val", "23/08/2025")
      .trigger("change");
    cy.get("#ContentPlaceHolder1_ddlResponsavel").select("4_BIO");
    cy.get("#ContentPlaceHolder1_txtValorMinimoPedido").type("1000");
    cy.get(":nth-child(10) > .switch > .slider").click();
    cy.get("#ContentPlaceHolder1_btnProsseguirCondicao").click();
  }

  function CadastroUsuario() {
    cy.get("#ContentPlaceHolder1_btnAddTodosUsuarios").click();
    cy.get("#ContentPlaceHolder1_btnProsseguirUsuario").click();
  }

  function CadastroDeCliente() {
    cy.get("#ContentPlaceHolder1_ddlRegiaoClientes").select("BRASIL");
    cy.get("#ContentPlaceHolder1_ddlEstadoCliente").select("SÃO PAULO");
    cy.get("#ContentPlaceHolder1_ddlCidadeCliente", { timeout: 10000 })
      .find("option")
      .should("contain.text", "SAOPAULO");
    cy.get("#ContentPlaceHolder1_txtCEPCliente").type("15550-000");
    cy.get("#ContentPlaceHolder1_txtCNPJCliente").type(CNPJValido);
    cy.get("#ContentPlaceHolder1_btnAdicionarFiltro").click();

    cy.get(":nth-child(2) > .gridRow > :nth-child(2)", {
      timeout: 10000,
    }).should("contain.text", `CNPJ (${CNPJValido})`);

    cy.get("#ContentPlaceHolder1_btnProsseguirCliente").click();
  }

  function CadastroDistribuidoresComercial() {
    cy.get("#ContentPlaceHolder1_btnAdicionarTodos").click();
    cy.get("#ContentPlaceHolder1_btnProsseguirProduto").click();
  }

  function CadastrarProduto() {
    /*cy.get("#ContentPlaceHolder1_ddlFiltroDivisaoProdutos").select(
      "CARDIOLOGIA"
    );
    cy.get("#ContentPlaceHolder1_ddlFiltroLinhaProdutos").select(
      "CARDIOLOGIA - FIRIALTA"
    );
    cy.get("#ContentPlaceHolder1_ddlFiltroMarcaProdutos").select("FIRIALTA"); */
    cy.get("#ContentPlaceHolder1_btnProsseguirCombo").click();
  }

  function CadastrarCombos() {
    cy.get("#ContentPlaceHolder1_txtDescricaoCombo").type("nomeAleatorio");
    cy.get("#ContentPlaceHolder1_ddlComboTipo").select("3");
    cy.get("#ContentPlaceHolder1_ddlComboTipoProduto", {
      timeout: 4000,
    }).select("1955");
    cy.get("#ContentPlaceHolder1_ddlProdutoCombo").select("MIRENA");
    cy.get("#ContentPlaceHolder1_txtQtdCombo").type("2");
    cy.get("#ContentPlaceHolder1_btnAdicionarProdutoCombo").click();
    cy.get("#ContentPlaceHolder1_btnGravarCondicao").click();
    cy.get("#ajaxLoading", { timeout: 100000 }).should("not.be.visible");
    validarTextoVisivel(".gridRow > :nth-child(3)", nomeEmpresa);
  }

  it("Fluxo completo com dados dinâmicos", () => {
    CadastroCondicaoComercial();
    CadastroUsuario();
    CadastroDeCliente();
    CadastroDistribuidoresComercial();
    CadastrarProduto();
    CadastrarCombos();
  });
});

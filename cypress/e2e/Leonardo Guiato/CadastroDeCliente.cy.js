import { faker } from "@faker-js/faker/locale/pt_BR";
import { cnpj } from "cpf-cnpj-validator";

const { registrarErrosJS } = require("../../pages/tratamentos/errosJS.js");
const {
  validarCampoSemMascara,
  validarCampoSemCase,
} = require("../../pages/tratamentos/validacoesCampos.js");

registrarErrosJS();

describe("Cadastro de Cliente com dados dinâmicos válidos", () => {
  const cnpjGerado = cnpj.generate();
  const nomeFantasia = faker.company.name();
  const razaoSocial = faker.company.name();
  const CEP = "01001-000";
  const bairro = "Sé";
  const logradouro = "Praça da Sé";
  const numeroLogradouro = faker.number.int({ min: 1, max: 9999 }).toString();

  beforeEach(() => {
    cy.session("login-session", () => {
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
  });

  function cadastroCliente() {
    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Especialidades/Adm/admPdv.aspx"
    );
    cy.get("#nav > :nth-child(3) > .sf-with-ul").click();
    cy.contains("Cadastro de Cliente").click();
    cy.get("#ContentPlaceHolder1_btNovoPDV").click();
    cy.get("#ContentPlaceHolder1_trTipoDocumento").contains("JURIDICA").click();
    cy.get("#ContentPlaceHolder1_DDLTipoCli").select("CLIENTE - Bayer");
    cy.get("#ContentPlaceHolder1_PesRazaoSocial_Nome").type(razaoSocial);
    cy.get("#ContentPlaceHolder1_PesCNPJ_CPF").type(cnpjGerado);
    cy.get("h1").click();
    cy.get("#ContentPlaceHolder1_PopupCNPJ_ctl00_btCancelarPopup").click();
    cy.get("#ContentPlaceHolder1_PesNomeFantasia")
      .invoke("val", nomeFantasia)
      .trigger("input")
      .trigger("change")
      .trigger("blur")
      .should("have.value", nomeFantasia);
    cy.get("#ContentPlaceHolder1_ListSetorVenda").select("454");
    cy.get("#ContentPlaceHolder1_btnAddSetorVenda").click();
  }

  function cadastroEndereco() {
    cy.get("#liAbaEndereco").click();
    cy.get("#ContentPlaceHolder1_dlEndereco_EndCep_0").type(CEP);
    cy.get("#ContentPlaceHolder1_dlEndereco_ddlEstados_0").select("SP");
    cy.get("#ContentPlaceHolder1_dlEndereco_idCidade_0").select("São Paulo");
    cy.get("#ContentPlaceHolder1_dlEndereco_EndBairro_0").type(bairro);
    cy.get("#ContentPlaceHolder1_dlEndereco_EndLogradouro_0").type(logradouro);
    cy.get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0").type(
      numeroLogradouro
    );
    cy.get("#ContentPlaceHolder1_btEnviar").click();
    cy.get("#ajaxLoading", { timeout: 100000 }).should("not.be.visible");

    cy.get("#ContentPlaceHolder1_txtCPFCNPJ").type(cnpjGerado);
    cy.get("#ContentPlaceHolder1_BtnProcurar").click();
    cy.get("#ajaxLoading", { timeout: 100000 }).should("not.be.visible");
    cy.get(".gridRow > :nth-child(3)").should("contain.text", cnpjGerado);
  }

  it("Fluxo completo de cadastro com CNPJ válido", () => {
    cadastroCliente();
    cadastroEndereco();
  });
});

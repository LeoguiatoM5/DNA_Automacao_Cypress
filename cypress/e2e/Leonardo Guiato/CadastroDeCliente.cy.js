import { faker } from "@faker-js/faker/locale/pt_BR";
import { cnpj } from "cpf-cnpj-validator";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

const {
  validarCampoSemMascara,
  validarCampoSemCase,
} = require("../../pages/tratamentos/validacoesCampos.js");

describe("Cadastro de Cliente", () => {
  const cnpjGerado = cnpj.generate();
  const nomeFantasia = faker.company.name();
  const razaoSocial = faker.company.name();
  const CEP = "01001-000";
  const bairro = "Sé";
  const logradouro = "Praça da Sé";
  const numeroLogradouro = faker.number.int({ min: 1, max: 9999 }).toString();

  const novoBairro = "Bela Vista";
  const novoLogradouro = "Rua Rui Barbosa";
  const novoNumeroLogradouro = faker.number
    .int({ min: 1, max: 9999 })
    .toString();

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

  function cadastroCliente() {
    cy.log(` CNPJ gerado: ${cnpjGerado}`);

    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Especialidades/Adm/admPdv.aspx?cod=D23202A1-73A1-461B-B2EF-8F3665D992B9|2155"
    );
    cy.get("#ContentPlaceHolder1_btNovoPDV").click();

    cy.wait(5000);

    cy.get("#ContentPlaceHolder1_trTipoDocumento").contains("JURIDICA").click();
    cy.get("#ContentPlaceHolder1_DDLTipoCli").select("CLIENTE - Bayer");

    cy.get("#ContentPlaceHolder1_PesRazaoSocial_Nome", { timeout: 4000 }).type(
      razaoSocial
    );
    cy.get("#ContentPlaceHolder1_PesCNPJ_CPF").type(cnpjGerado);
    cy.get("#ContentPlaceHolder1_PopupCNPJ_ctl00_btCancelarPopup").click({
      force: true,
    });
    cy.get("#ContentPlaceHolder1_PopupCNPJ_ctl00_btnVerificaCNPJ").click();

    cy.get("#ContentPlaceHolder1_PesNomeFantasia").type(nomeFantasia);

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

    cy.get("#ajaxLoading", { timeout: 60000 }).should("not.be.visible");
  }

  function buscarClientePorCNPJ() {
    cy.get("#ContentPlaceHolder1_txtCPFCNPJ").clear().type(cnpjGerado);
    cy.get("#ContentPlaceHolder1_BtnProcurar").click();

    cy.get("#ajaxLoading", { timeout: 60000 }).should("not.be.visible");
    cy.get(".gridRow > :nth-child(3)", { timeout: 10000 }).should(
      "contain.text",
      cnpjGerado
    );
  }

  function validacaoCadastro() {
    cy.get("#ContentPlaceHolder1_rptResultado_imgSelecionar_0").click();

    cy.get("#ContentPlaceHolder1_PesCNPJ_CPF", { timeout: 50000 }).should(
      "be.visible"
    );

    validarCampoSemMascara("#ContentPlaceHolder1_PesCNPJ_CPF", cnpjGerado);
    validarCampoSemCase(
      "#ContentPlaceHolder1_PesRazaoSocial_Nome",
      razaoSocial
    );
    validarCampoSemCase("#ContentPlaceHolder1_PesNomeFantasia", nomeFantasia);

    cy.get("#ContentPlaceHolder1_ListSetorSelecionados > option").should(
      "contain.text",
      "(CARDIO) CAR005 Carlos Giorgenon"
    );

    cy.get("#liAbaEndereco").click();

    cy.get("#ContentPlaceHolder1_dlEndereco_EndCep_0").should("be.visible");
    cy.get("#ContentPlaceHolder1_dlEndereco_ddlEstados_0")
      .find(":selected")
      .should("contain.text", "SP");
    cy.get("#ContentPlaceHolder1_dlEndereco_idCidade_0")
      .find(":selected")
      .should("contain.text", "São Paulo");

    validarCampoSemCase("#ContentPlaceHolder1_dlEndereco_EndBairro_0", bairro);
    validarCampoSemCase(
      "#ContentPlaceHolder1_dlEndereco_EndLogradouro_0",
      logradouro
    );

    cy.get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0").should(
      "have.value",
      numeroLogradouro
    );
  }

  function edicaoEndereco() {
    cy.get("#ContentPlaceHolder1_dlEndereco_EndBairro_0")
      .clear()
      .type(novoBairro);
    cy.get("#ContentPlaceHolder1_dlEndereco_EndLogradouro_0")
      .clear()
      .type(novoLogradouro);
    cy.get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0")
      .clear()
      .type(novoNumeroLogradouro);

    cy.get("#ContentPlaceHolder1_btEnviar").click();
    cy.get("#ajaxLoading", { timeout: 100000 }).should("not.be.visible");
  }

  function validarEnderecoEditado() {
    buscarClientePorCNPJ();
    cy.get("#ContentPlaceHolder1_rptResultado_imgSelecionar_0").click();
    cy.get("#liAbaEndereco", { timeout: 50000 }).click();
    cy.get("#ContentPlaceHolder1_dlEndereco_EndCep_0").should("be.visible");

    validarCampoSemCase(
      "#ContentPlaceHolder1_dlEndereco_EndBairro_0",
      novoBairro
    );
    validarCampoSemCase(
      "#ContentPlaceHolder1_dlEndereco_EndLogradouro_0",
      novoLogradouro
    );
    cy.get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0").should(
      "have.value",
      novoNumeroLogradouro
    );
  }

  it("Fluxo completo de cadastro, busca, validação e edição de endereço de cliente", () => {
    cy.log(" Iniciando cadastro do cliente");
    cadastroCliente();

    cy.log("Cadastro do endereço");
    cadastroEndereco();

    cy.log(" Buscando cliente pelo CNPJ");
    buscarClientePorCNPJ();

    cy.log(" Validando cadastro do cliente");
    validacaoCadastro();

    cy.log(" Editando endereço do cliente");
    edicaoEndereco();

    cy.log(" Validando endereço editado");
    validarEnderecoEditado();
  });
});

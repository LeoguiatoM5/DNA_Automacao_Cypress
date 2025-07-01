const { registrarErrosJS } = require("../../pages/tratamentos/errosJS.js");
const {
  validarCampoSemMascara,
  validarCampoSemCase,
} = require("../../pages/tratamentos/validacoesCampos.js");

registrarErrosJS();

describe("Fluxo após login válido", () => {
  const cnpjBuscado = "46587664000108";
  const nomeFantasia = "TesteFantasia38";
  const razaoSocial = "Teste39";
  const CEP = "14340000";
  const bairro = "centro";
  const logradouro = "centro";
  const numeroLogradouro = "10";

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
    cy.get("#ContentPlaceHolder1_PesCNPJ_CPF").type(cnpjBuscado);
    cy.get("h1").click();
    cy.get("#ContentPlaceHolder1_PopupCNPJ_ctl00_btCancelarPopup").click();
    cy.get("#ContentPlaceHolder1_PesNomeFantasia")
      .should("be.visible")
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
    cy.get("#ContentPlaceHolder1_dlEndereco_idCidade_0").select("Brodowski");
    cy.get("#ContentPlaceHolder1_dlEndereco_EndBairro_0").type(bairro);
    cy.get("#ContentPlaceHolder1_dlEndereco_EndLogradouro_0").type(logradouro);
    cy.get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0").type(
      numeroLogradouro
    );
    cy.get("#ContentPlaceHolder1_btEnviar").click();
    cy.get("#ajaxLoading", { timeout: 100000 }).should("not.be.visible");

    cy.get("#ContentPlaceHolder1_txtCPFCNPJ").type(cnpjBuscado);
    cy.get("#ContentPlaceHolder1_BtnProcurar").click();
    cy.get("#ajaxLoading", { timeout: 100000 }).should("not.be.visible");
    cy.get(".gridRow > :nth-child(3)", { timeout: 10000 }).should(
      "contain.text",
      cnpjBuscado
    );
  }

  function validacaoCadastro() {
    cy.get("#ContentPlaceHolder1_rptResultado_imgSelecionar_0").click();

    cy.get("#ContentPlaceHolder1_PesCNPJ_CPF", { timeout: 10000 }).should(
      "be.visible"
    );

    validarCampoSemMascara("#ContentPlaceHolder1_PesCNPJ_CPF", cnpjBuscado);

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

    validarCampoSemMascara("#ContentPlaceHolder1_dlEndereco_EndCep_0", CEP);

    cy.get("#ContentPlaceHolder1_dlEndereco_ddlEstados_0")
      .find(":selected")
      .should("contain.text", "SP");

    cy.get("#ContentPlaceHolder1_dlEndereco_idCidade_0")
      .find(":selected")
      .should("contain.text", "Brodowski");

    validarCampoSemCase("#ContentPlaceHolder1_dlEndereco_EndBairro_0", bairro);

    validarCampoSemCase(
      "#ContentPlaceHolder1_dlEndereco_EndLogradouro_0",
      logradouro
    );

    cy.get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0").should(
      "have.value",
      "10"
    );
  }

  it("Fluxo completo de cadastro de cliente e endereço e validação", () => {
    cadastroCliente();
    cadastroEndereco();
    validacaoCadastro();
  });
});

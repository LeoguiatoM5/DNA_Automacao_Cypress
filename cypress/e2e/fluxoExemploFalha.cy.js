const { registrarErrosJS } = require("../pages/tratamentos/errosJS");

registrarErrosJS();

describe("Cadastro de cliente e validação", () => {
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

  it("Fluxo completo de cadastro e validação", () => {
    const cnpjBuscado = "38797383000143";
    const nomeFantasia = "TesteFantasia39";
    const razaoSocial = "Teste39";
    const CEP = "14340000";
    const bairro = "centro";
    const logradouro = "centro";
    const numeroLogradouro = "10";

    // Acessa a tela de cadastro de cliente
    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Especialidades/Adm/admPdv.aspx"
    );
    cy.get("#nav > :nth-child(3) > .sf-with-ul").click();
    cy.contains("Cadastro de Cliente").click();
    cy.get("#ContentPlaceHolder1_btNovoPDV").click();

    // Preenche dados do cliente
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

    // Preenche endereço
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

    cy.waitUntil(
      () =>
        cy.get("body").then(($body) => {
          const isVisible = $body.find("#ajaxLoading").is(":visible");
          return !isVisible;
        }),
      {
        timeout: 1000,
        interval: 1000,
        errorMsg: "Falha: #ajaxLoading  Processo pode ter travado.",
      }
    );

    cy.get("#ContentPlaceHolder1_txtCPFCNPJ").type(cnpjBuscado);
    cy.get("#ContentPlaceHolder1_BtnProcurar").click();

    cy.waitUntil(
      () =>
        cy.get("body").then(($body) => {
          const isVisible = $body.find("#ajaxLoading").is(":visible");
          return !isVisible;
        }),
      {
        timeout: 20000,
        interval: 1000,
        errorMsg: "Falha ao buscar cliente: #ajaxLoading não desapareceu.",
      }
    );

    cy.get(".gridRow > :nth-child(3)", { timeout: 10000 }).should(
      "contain.text",
      cnpjBuscado
    );

    // Valida os dados
    cy.get("#ContentPlaceHolder1_rptResultado_imgSelecionar_0").click();
    cy.get("#ContentPlaceHolder1_PesCNPJ_CPF", { timeout: 10000 }).should(
      "be.visible"
    );
    cy.get("#ContentPlaceHolder1_PesCNPJ_CPF")
      .invoke("val")
      .then((val) => {
        expect(val.replace(/\D/g, "")).to.equal(cnpjBuscado);
      });
    cy.get("#ContentPlaceHolder1_PesRazaoSocial_Nome")
      .invoke("val")
      .then((val) => {
        expect(val.toLowerCase()).to.equal(razaoSocial.toLowerCase());
      });
    cy.get("#ContentPlaceHolder1_PesNomeFantasia")
      .invoke("val")
      .then((val) => {
        expect(val.toLowerCase()).to.equal(nomeFantasia.toLowerCase());
      });
    cy.get("#ContentPlaceHolder1_ListSetorSelecionados > option").should(
      "contain.text",
      "(CARDIO) CAR005 Carlos Giorgenon"
    );

    cy.get("#liAbaEndereco").click();
    cy.get("#ContentPlaceHolder1_dlEndereco_EndCep_0")
      .invoke("val")
      .then((val) => {
        expect(val.replace(/\D/g, "")).to.equal(CEP);
      });
    cy.get("#ContentPlaceHolder1_dlEndereco_ddlEstados_0")
      .find(":selected")
      .should("contain.text", "SP");
    cy.get("#ContentPlaceHolder1_dlEndereco_idCidade_0")
      .find(":selected")
      .should("contain.text", "Brodowski");
    cy.get("#ContentPlaceHolder1_dlEndereco_EndBairro_0")
      .invoke("val")
      .then((val) => {
        expect(val.toLowerCase()).to.equal(bairro.toLowerCase());
      });
    cy.get("#ContentPlaceHolder1_dlEndereco_EndLogradouro_0")
      .invoke("val")
      .then((val) => {
        expect(val.toLowerCase()).to.equal(logradouro.toLowerCase());
      });
    cy.get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0").should(
      "have.value",
      numeroLogradouro
    );
  });
});

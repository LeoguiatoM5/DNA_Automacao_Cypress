const { registrarErrosJS } = require("../../pages/tratamentos/errosJS");

registrarErrosJS();

describe("Cadastro de cliente e validação", () => {
  beforeEach(() => {
    cy.session("login-session", () => {
      cy.visit(
        "https://homologacaoesp.interplayers.com.br/PRJ/Especialidades/Acesso.aspx"
      );
      cy.get("#ContentPlaceHolder1_Control_Login2_Login1_UserName").type(
        "admbayer@dnaspecialty.com.br",
        { delay: 150 }
      );
      cy.get("#ContentPlaceHolder1_Control_Login2_Login1_Password").type(
        "12345678",
        { delay: 150 }
      );
      cy.get("#ContentPlaceHolder1_Control_Login2_Login1_LoginButton").click();
    });
  });

  it("Fluxo completo de cadastro e validação", () => {
    const cnpjBuscado = "590431031000190";
    const nomeFantasia = "TesteFantasia60";
    const razaoSocial = "Teste60";
    const CEP = "14340000";
    const bairro = "centro";
    const logradouro = "centro";
    const numeroLogradouro = "10";

    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Especialidades/Adm/admPdv.aspx"
    );
    cy.get("#nav > :nth-child(3) > .sf-with-ul").click();
    cy.contains("Cadastro de Cliente").click();
    cy.get("#ContentPlaceHolder1_btNovoPDV").click();

    cy.get("#ContentPlaceHolder1_trTipoDocumento").contains("JURIDICA").click();
    cy.get("#ContentPlaceHolder1_DDLTipoCli").select("CLIENTE - Bayer");
    cy.get("#ContentPlaceHolder1_PesRazaoSocial_Nome").type(razaoSocial, {
      delay: 150,
    });
    cy.get("#ContentPlaceHolder1_PesCNPJ_CPF").type(cnpjBuscado, {
      delay: 150,
    });
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

    cy.get("#liAbaEndereco").click();
    cy.get("#ContentPlaceHolder1_dlEndereco_EndCep_0").type(CEP, {
      delay: 150,
    });
    cy.get("#ContentPlaceHolder1_dlEndereco_ddlEstados_0").select("SP");
    cy.get("#ContentPlaceHolder1_dlEndereco_idCidade_0").select("Brodowski");
    cy.get("#ContentPlaceHolder1_dlEndereco_EndBairro_0").type(bairro, {
      delay: 150,
    });
    cy.get("#ContentPlaceHolder1_dlEndereco_EndLogradouro_0").type(logradouro, {
      delay: 150,
    });
    cy.get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0").type(
      numeroLogradouro,
      { delay: 150 }
    );
    cy.get("#ContentPlaceHolder1_btEnviar").click();
    cy.get("#ajaxLoading", { timeout: 100000 }).should("not.be.visible");

    cy.get("#ContentPlaceHolder1_txtCPFCNPJ").type(cnpjBuscado, { delay: 150 });
    cy.get("#ContentPlaceHolder1_BtnProcurar").click();
    cy.get("#ajaxLoading", { timeout: 10000 }).should("not.be.visible");
    cy.get(".gridRow > :nth-child(3)", { timeout: 100000 }).should(
      "contain.text",
      cnpjBuscado
    );

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

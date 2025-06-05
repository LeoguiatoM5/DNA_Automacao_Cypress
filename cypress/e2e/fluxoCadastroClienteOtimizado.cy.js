const { registrarErrosJS } = require("./errosJS");

registrarErrosJS();

describe("Fluxo após login válido", () => {
  const cnpjBuscado = "36557990000100";
  const nomeFantasia = "TesteFantasia18";
  const razaoSocial = "Teste18";

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
    cy.get("#ContentPlaceHolder1_dlEndereco_EndCep_0").type("14340000");
    cy.get("#ContentPlaceHolder1_dlEndereco_ddlEstados_0").select("SP");
    cy.get("#ContentPlaceHolder1_dlEndereco_idCidade_0").select("Brodowski");
    cy.get("#ContentPlaceHolder1_dlEndereco_EndBairro_0").type("centro");
    cy.get("#ContentPlaceHolder1_dlEndereco_EndLogradouro_0").type("centro");
    cy.get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0").type("10");
    cy.get("#ContentPlaceHolder1_btEnviar").click();
    cy.get("#ajaxLoading", { timeout: 10000 }).should("not.be.visible");

    cy.get("#ContentPlaceHolder1_txtCPFCNPJ").type(cnpjBuscado);
    cy.get("#ContentPlaceHolder1_BtnProcurar").click();
    cy.get("#ajaxLoading", { timeout: 100000 }).should("not.be.visible");
    cy.get(".gridRow > :nth-child(3)", { timeout: 10000 }).should(
      "contain.text",
      cnpjBuscado
    );
  }

  it("Fluxo completo de cadastro de cliente e endereço e validação", () => {
    cadastroCliente();
    cadastroEndereco();
  });
});

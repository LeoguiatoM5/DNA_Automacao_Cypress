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
    const cnpjBuscado = "05883936000121";
    const nomeFantasia = "TesteFantasia54";
    const razaoSocial = "Teste54";
    const CEP = "14340000";
    const bairro = "centro";
    const logradouro = "centro";
    const numeroLogradouro = "10";

    // Acesso à tela de cadastro
    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Especialidades/Adm/admPdv.aspx"
    );
    cy.get("#nav > :nth-child(3) > .sf-with-ul").click();
    cy.contains("Cadastro de Cliente").click();
    cy.get("#ContentPlaceHolder1_btNovoPDV").click();

    // Dados do cliente
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

    // Endereço
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

    // Consulta e validação
    cy.get("#ContentPlaceHolder1_txtCPFCNPJ").type(cnpjBuscado, { delay: 150 });
    cy.get("#ContentPlaceHolder1_BtnProcurar").click();
    cy.get("#ajaxLoading", { timeout: 100000 }).should("not.be.visible");

    cy.get(".gridRow > :nth-child(3)", { timeout: 100000 }).should(
      "contain.text",
      cnpjBuscado
    );
    cy.get("#ContentPlaceHolder1_rptResultado_imgSelecionar_0").click();

    cy.get("#ContentPlaceHolder1_PesCNPJ_CPF", { timeout: 10000 })
      .should("be.visible")
      .should("have.value", cnpjBuscado);

    cy.get("#ContentPlaceHolder1_PesRazaoSocial_Nome").should(
      "have.value",
      razaoSocial
    );
    cy.get("#ContentPlaceHolder1_PesNomeFantasia").should(
      "have.value",
      nomeFantasia
    );

    cy.get("#ContentPlaceHolder1_ListSetorSelecionados > option").should(
      "contain.text",
      "(CARDIO) CAR005 Carlos Giorgenon"
    );

    cy.get("#liAbaEndereco").click();
    cy.get("#ContentPlaceHolder1_dlEndereco_EndCep_0").should(
      "have.value",
      CEP
    );
    cy.get("#ContentPlaceHolder1_dlEndereco_ddlEstados_0")
      .find(":selected")
      .should("contain.text", "SP");
    cy.get("#ContentPlaceHolder1_dlEndereco_idCidade_0")
      .find(":selected")
      .should("contain.text", "Brodowski");
    cy.get("#ContentPlaceHolder1_dlEndereco_EndBairro_0").should(
      "have.value",
      bairro
    );
    cy.get("#ContentPlaceHolder1_dlEndereco_EndLogradouro_0").should(
      "have.value",
      logradouro
    );
    cy.get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0").should(
      "have.value",
      numeroLogradouro
    );
  });
});

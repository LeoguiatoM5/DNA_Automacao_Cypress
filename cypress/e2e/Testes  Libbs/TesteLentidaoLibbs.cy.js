const { registrarErrosJS } = require("../../pages/tratamentos/errosJS.js");
const { cadastroCliente } = require("../../pages/Functions/funcoes.js");

registrarErrosJS();

// Primeiro describe: usuário Anderson
describe("Descrição do Teste - Usuário Anderson", () => {
  beforeEach(() => {
    cy.session("login-Anderson", () => {
      cy.visit(
        "https://homologacaoesp.interplayers.com.br/PRJ/Libbs/Acesso.aspx"
      );
      cy.get("#ContentPlaceHolder1_Control_pnlLogin_Login1_UserName").type(
        "Anderson"
      );
      cy.get("#ContentPlaceHolder1_Control_pnlLogin_Login1_Password").type(
        "123456@"
      );
      cy.get(
        "#ContentPlaceHolder1_Control_pnlLogin_Login1_LoginButton"
      ).click();
    });
  });

  it("Teste de Lentidão Plataforma Libbs - Anderson", () => {
    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Libbs/Default.aspx",
      { timeout: 120000 }
    );

    cy.get(":nth-child(5) > .sf-with-ul").click();
    cy.contains("Listar Pedidos").click();
    cy.wait(8000);
    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Libbs/Logout.aspx?Cod=7e0eaef2-3c6a-4532-9304-272c245f0060|0&"
    );
  });
});

// Segundo describe: usuário Entire
describe("Descrição do Teste - Usuário Entire", () => {
  beforeEach(() => {
    cy.session("login-Entire", () => {
      cy.visit("https://libbs.entiretp.com.br/Acesso.aspx");
      cy.get("#ContentPlaceHolder1_Control_pnlLogin_Login1_UserName").type(
        "Entire"
      );
      cy.get("#ContentPlaceHolder1_Control_pnlLogin_Login1_Password").type(
        "12345678"
      );
      cy.get(
        "#ContentPlaceHolder1_Control_pnlLogin_Login1_LoginButton"
      ).click();
    });
  });

  it("Teste de Lentidão Plataforma Libbs - Entire", () => {
    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Libbs/Default.aspx",
      { timeout: 120000 }
    );

    cy.get(":nth-child(7) > .sf-with-ul").click();
    cy.contains("Listar Pedidos").click();
    cy.wait(8000);
    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Libbs/Logout.aspx?Cod=7e0eaef2-3c6a-4532-9304-272c245f0060|0&"
    );
  });
});

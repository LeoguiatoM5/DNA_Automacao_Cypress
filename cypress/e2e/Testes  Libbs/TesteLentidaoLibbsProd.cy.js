const { registrarErrosJS } = require("../../pages/tratamentos/errosJS.js");
const { cadastroCliente } = require("../../pages/Functions/funcoes.js");

registrarErrosJS();

describe("Teste de Lentidão Plataforma Libbs - Produção", () => {
  beforeEach(() => {
    cy.session("login-Entire-Prod", () => {
      cy.visit("https://libbs.entiretp.com.br/Acesso.aspx");
      cy.get("#ContentPlaceHolder1_Control_pnlLogin_Login1_UserName").type(
        "Entire"
      );
      cy.get("#ContentPlaceHolder1_Control_pnlLogin_Login1_Password").type(
        "Dn@Spe!@#1"
      );
      cy.get(
        "#ContentPlaceHolder1_Control_pnlLogin_Login1_LoginButton"
      ).click();
    });
  });

  it("Teste de Lentidão - Produção", () => {
    cy.visit("https://libbs.entiretp.com.br/Default.aspx", { timeout: 120000 });

    cy.get(":nth-child(7) > .sf-with-ul", { timeout: 15000 }).should(
      "be.visible"
    );
    cy.get(":nth-child(7) > .sf-with-ul").click();

    cy.contains("Listar Pedidos").should("be.visible").click();

    // Captura o momento antes da navegação
    const start = Date.now();

    // Aguarda o elemento final que comprova carregamento
    cy.get("#lblTituloPagina", { timeout: 60000 })
      .should("be.visible")
      .then(() => {
        const end = Date.now();
        const elapsed = (end - start) / 1000;

        cy.log(` Tempo até carregar Listar Pedidos: ${elapsed.toFixed(2)}s`);

        if (elapsed > 8) {
          throw new Error(
            ` BUG: Demorou ${elapsed.toFixed(2)}s para carregar!`
          );
        }
      });
  });
});

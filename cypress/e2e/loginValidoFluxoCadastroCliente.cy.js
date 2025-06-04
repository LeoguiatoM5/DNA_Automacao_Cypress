Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Fluxo após login válido", () => {
  before(() => {
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

  it("Cadastro de Cliente", () => {
    cy.get("#nav > :nth-child(3) > .sf-with-ul").click();
    cy.contains("Cadastro de Cliente").click();
    cy.get('#ContentPlaceHolder1_btNovoPDV').click()
     cy.get('#ContentPlaceHolder1_trTipoDocumento').contains('JURIDICA').click();
    cy.get('#ContentPlaceHolder1_DDLTipoCli').select("CLIENTE - Bayer"); 
    cy.get('#ContentPlaceHolder1_PesRazaoSocial_Nome').type("Teste")       
  


   
  });
});

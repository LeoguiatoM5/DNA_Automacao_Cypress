Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


describe("Teste Login", () => {
  beforeEach(() => {
    cy.visit("https://homologacaoesp.interplayers.com.br/PRJ/Especialidades/Acesso.aspx");
  });

  it("Caso de Teste: Login inválido", () => {
    cy.get('#ContentPlaceHolder1_Control_Login2_Login1_UserName')
      .type("usuario_invalido");

    cy.get("#ContentPlaceHolder1_Control_Login2_Login1_Password")
      .type("senha_invalida");

    cy.get("#ContentPlaceHolder1_Control_Login2_Login1_LoginButton")
      .click();

    cy.get(':nth-child(3) > td')
      .should("contain", "Usuário ou Senha inválidos.")
  });
});



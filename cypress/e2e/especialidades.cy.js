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


describe("Fluxo após login válido", () => {
  before(() => {
    cy.visit("https://homologacaoesp.interplayers.com.br/PRJ/Especialidades/Acesso.aspx");
    cy.get('#ContentPlaceHolder1_Control_Login2_Login1_UserName')
      .type("admbayer@dnaspecialty.com.br");

    cy.get("#ContentPlaceHolder1_Control_Login2_Login1_Password")
      .type("12345678");

    cy.get("#ContentPlaceHolder1_Control_Login2_Login1_LoginButton")
      .click();
  });

  it("Cadastro de Cliente", () => {
    cy.get('#nav > :nth-child(3) > .sf-with-ul').click()
    cy.contains('Cadastro de Cliente').click();
    
    
    
  });
});
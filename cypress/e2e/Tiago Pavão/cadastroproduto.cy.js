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

  it("Cadastro Produto SKU", () => {
    const nomeproduto= "Produto Teste Automação7"
    const ean= "7894561469" 
    const codigoproduto= "128"
   
    cy.get(':nth-child(4) > .sf-with-ul').click();
    cy.contains("Produto (SKU)").click();
    cy.get('#ContentPlaceHolder1_btNovoProduto').click()
    cy.get('#ContentPlaceHolder1_dropDivisaoCadastro').select ("CARDIOLOGIA")
    cy.get('#ContentPlaceHolder1_dropGrupoProdutoCadastro').select("CARDIOLOGIA - ASPIRINA PREVENT")
    cy.get('#ContentPlaceHolder1_dropProduto').select("ASPIRINA")
    cy.get('#ContentPlaceHolder1_txtProDsc').type("Produto Teste")
    cy.get('#ContentPlaceHolder1_txtProNome').type(nomeproduto)
    cy.get('#ContentPlaceHolder1_txtProEAN').type(ean)
    cy.get('#ContentPlaceHolder1_txtProCod').type(codigoproduto)
    cy.get('.grid2 > .campo > .switch > .slider').click()
    cy.get('#ContentPlaceHolder1_txtQTdCaixas').type("10")
    cy.get('#ContentPlaceHolder1_txtQtdDentroCaixa').type("10")
    cy.get('#ContentPlaceHolder1_btSalvar').click()
    cy.get('#ContentPlaceHolder1_txtProdutoNomeFiltro').type(nomeproduto)
    cy.get('#ContentPlaceHolder1_BtnProcurar').click()
    cy.get('.gridRow > :nth-child(4)').should ("contain.text",ean)
    

   
  });
});
import { faker } from "@faker-js/faker/locale/pt_BR";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
//https://talkingabouttesting.com/2021/09/13/como-criar-fixtures-com-dados-aleatorios-com-cypress-e-faker/
//https://www.npmjs.com/package/@faker-js/faker

describe("Fluxo após login válido", () => {
  const nomefamilia = faker.commerce.productName();
  //const ean = faker.string.numeric(13);
  //const codigoproduto = faker.number.int({ min: 999 }).toString();
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


  function cadastroFamilia() {
    cy.get(':nth-child(4) > .sf-with-ul').click();
    cy.contains("Família").click();
    cy.get('#ContentPlaceHolder1_btNovoProduto').click();
    cy.get('#ContentPlaceHolder1_dropDivisaoCadastro').select ("CARDIOLOGIA");
    cy.get('#ContentPlaceHolder1_dropGrupoProdutoCadastro').select ("CARDIOLOGIA - FIRIALTA");
    cy.get('#ContentPlaceHolder1_txtDescricao').type (nomefamilia);
    cy.get('#ContentPlaceHolder1_Tr1 > .switch > .slider').click();
    cy.get('#ContentPlaceHolder1_btSalvar').click();
        
  }

  function buscarFamilia() {
    cy.get('#ContentPlaceHolder1_txtProdutoNomeFiltro').type (nomefamilia);
    cy.get('#ContentPlaceHolder1_BtnProcurar').click();
    cy.get('tbody > :nth-child(2) > :nth-child(3)').should ("contain.text", nomefamilia)
    
  }

  it("Cadastro Familia", () => {
    cy.log ("Cadastro Familia");
    cadastroFamilia();

    cy.log("Bucar Produto Cadastrado");
    buscarFamilia();
     
       
  });
});
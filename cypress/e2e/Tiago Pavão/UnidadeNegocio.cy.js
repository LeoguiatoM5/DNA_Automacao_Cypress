import { faker } from "@faker-js/faker/locale/pt_BR";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
//https://talkingabouttesting.com/2021/09/13/como-criar-fixtures-com-dados-aleatorios-com-cypress-e-faker/
//https://www.npmjs.com/package/@faker-js/faker

describe("Fluxo após login válido", () => {
  const nomeunidade = faker.commerce.productName();
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


  function cadastrounidadenegocio() {
    cy.get(':nth-child(4) > .sf-with-ul').click();
    cy.contains("Unidade de Negócio (BU)").click();
    cy.get('#ContentPlaceHolder1_btNovoProduto').click();
    cy.get('#ContentPlaceHolder1_dropDivisaoCadastro').select ("CARDIOLOGIA");
    cy.get('#ContentPlaceHolder1_txtDescricao').type (nomeunidade);
    cy.get('.slider').click();
    cy.get('#ContentPlaceHolder1_btSalvar').click();
    
  }

  function buscarUnidade() {
    cy.get('#ContentPlaceHolder1_txtProdutoNomeFiltro').type (nomeunidade);
    cy.get('#ContentPlaceHolder1_BtnProcurar').click();
    cy.get('tbody > :nth-child(2) > :nth-child(3)').should ("contain.text", nomeunidade)
    
  }

  it("Cadastro Unidade Negocio", () => {
    cy.log ("Cadastro Nova Unidade de Negocio");
    cadastrounidadenegocio();

    cy.log("Bucar Produto Cadastrado");
    buscarUnidade();
     
       
  });
});
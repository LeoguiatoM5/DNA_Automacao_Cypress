import { faker } from "@faker-js/faker/locale/pt_BR";


const { registrarErrosJS } = require("../../pages/tratamentos/errosJS.js");
const {
  validarCampoSemMascara,
  validarCampoSemCase,
} = require("../../pages/tratamentos/validacoesCampos.js");

registrarErrosJS();

describe("Cadastro Tipo de Estoque", () => {
  //Variáveis
  const nomeEstoque1 = faker.company.name();
  const nomeEstoque2 = faker.company.name();

  beforeEach(() => {
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


  it("Cadastro de Estoques ", () => {
  
    cy.get(':nth-child(5) > .sf-with-ul').click();
    cy.contains("Tipos de Estoque").click();
    cy.get('#ContentPlaceHolder1_btNovo').click();
    cy.get('#ContentPlaceHolder1_txtDescricao').type(nomeEstoque1);
    cy.get('tr > :nth-child(1) > label').click();
    cy.get('.slider').click();
    cy.get('#ContentPlaceHolder1_btSalvar').click();
    
    cy.get('#ContentPlaceHolder1_btNovo').click();
    cy.get('#ContentPlaceHolder1_txtDescricao').type(nomeEstoque2);
    cy.get(':nth-child(2) > label').click();
    cy.get('.slider').click();
    cy.get('#ContentPlaceHolder1_btSalvar').click();
  
    //"Busca novos cadastros"

    cy.get('#ContentPlaceHolder1_TxtDesc').type(nomeEstoque1);
    cy.get('#ContentPlaceHolder1_BtnProcurar').click();
    cy.get('tbody > :nth-child(2) > :nth-child(2)').should ("contain.text", nomeEstoque1);
    cy.get('#ContentPlaceHolder1_TxtDesc').type(nomeEstoque2);
    cy.get('#ContentPlaceHolder1_BtnProcurar').click();
    cy.get('tbody > :nth-child(2) > :nth-child(2)').should ("contain.text", nomeEstoque2);
     
  });
});

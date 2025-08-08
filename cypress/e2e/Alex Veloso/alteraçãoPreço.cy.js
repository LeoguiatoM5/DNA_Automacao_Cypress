import { faker } from "@faker-js/faker/locale/pt_BR";

const { registrarErrosJS } = require("../../pages/tratamentos/errosJS.js");
const {
  validarCampoSemMascara,
  validarCampoSemCase,
} = require("../../pages/tratamentos/validacoesCampos.js");

registrarErrosJS();

describe("Cadastro Tabela de Preço", () => {

    // Variaveis
    const EAN = "7891106915960";
    const precoFabrica = "1223,2200"; 
    const precoConsumidor = "1223,5000";

    //Fim variaveis

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


    function buscaProduto() {
    //Acesso menu alteração de Preço
        cy.get('[accesskey="1"] > .sf-sub-indicator').click();
        cy.contains("Tabela Preço").click();
        cy.contains("Alteração de preços dos produtos").click();
        cy.wait(2000);
        cy.get('#ContentPlaceHolder1_txtProdutoEANFiltro').type(EAN);
        cy.get('#ContentPlaceHolder1_BtnProcurar').click();
        cy.get('.gridRow > :nth-child(3)').should("contain.text",EAN);

    }

    function alteracaoPrecoProduto(){
        //Alterar preços do produto
        cy.get('#ContentPlaceHolder1_rptResultado_imgSelecionar_0').click();
        cy.get('#ContentPlaceHolder1_rptResultado_gridTabelaPrecos_0_txtPrecoFabrica_0').clear().type(precoFabrica);
        cy.get('#ContentPlaceHolder1_rptResultado_gridTabelaPrecos_0_txtPrecoConsumidor_0').clear().type(precoConsumidor);
        cy.get('#ContentPlaceHolder1_rptResultado_BtnTabPrecosSalvar_0').click();

    }

    function buscaProdutoNovoPreco() {
    //busca novo preço produto        
        cy.get('#ContentPlaceHolder1_txtProdutoEANFiltro').type(EAN);
        cy.get('#ContentPlaceHolder1_BtnProcurar').click();
        cy.get('.gridRow > :nth-child(3)').should("contain.text",EAN);
        cy.get('#ContentPlaceHolder1_rptResultado_imgSelecionar_0').click();
        cy.get('#ContentPlaceHolder1_rptResultado_gridTabelaPrecos_0_txtPrecoFabrica_0').should('have.value',"1.223,2200");
        cy.get('#ContentPlaceHolder1_rptResultado_gridTabelaPrecos_0_txtPrecoConsumidor_0').should('have.value',"1.223,5000");

    }

    it ("Fluxo de Cadastro de Nova Tabela Preço", () => {
        buscaProduto();

        alteracaoPrecoProduto();

        cy.wait(2000);

        buscaProdutoNovoPreco();


   });

  });
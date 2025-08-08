import { faker } from "@faker-js/faker/locale/pt_BR";

const { registrarErrosJS } = require("../../pages/tratamentos/errosJS.js");
const {
  validarCampoSemMascara,
  validarCampoSemCase,
} = require("../../pages/tratamentos/validacoesCampos.js");

registrarErrosJS();

describe("Cadastro Tabela de Preço", () => {

    // Variaveis
    const nomeTabela = `Teste DNA-${faker.company.name()}`;
    const prioridade = "1";

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


    function cadastroNovaTabela() {
    //Acesso menu Tabela de Preço
    cy.get('[accesskey="1"] > .sf-sub-indicator').click();
    cy.contains("Tabela Preço").click();
    cy.contains("Cadastro Tabela Preço").click();
    
    // Adicionar nova tabela de preço
    cy.get('#ContentPlaceHolder1_btnNova').click();
    cy.get('#ContentPlaceHolder1_ddlEmpresa').select("SAUDE FEMININA")
    cy.get('#ContentPlaceHolder1_txtDescricao').type(nomeTabela);
    cy.get('#ContentPlaceHolder1_txtCodigo').type(nomeTabela);
    cy.get('#ContentPlaceHolder1_txtPrioridade').type(prioridade);
    //cy.get('.slider').click();

    // Filtro de Região
    cy.get('#ContentPlaceHolder1_ddlRegiaoClientes').select("BRASIL");
    cy.get('#ContentPlaceHolder1_btnAdicionarFiltro').click();
    //cy.get('#ContentPlaceHolder1_btnTestarFiltro').click();
    //cy.get('.ui-dialog-titlebar > .ui-dialog-titlebar-close').click();
    cy.get('#ContentPlaceHolder1_btnSalvarFechar').click();

    }

    function buscarNovaTabela(){
    // buscar tabela
    cy.get('#ContentPlaceHolder1_txtTabelaPrecoFiltro').type(nomeTabela);
    cy.get('#ContentPlaceHolder1_BtnProcurar').click();
    cy.get('tbody > :nth-child(2) > :nth-child(2)').should("contain.text", nomeTabela);

    }


   it ("Fluxo de Cadastro de Nova Tabela Preço", () => {

    cadastroNovaTabela();
    buscarNovaTabela();




   });
    

});
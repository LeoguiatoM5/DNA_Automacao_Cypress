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
    cy.get('.slider').click();

    // Filtro de Região
    cy.get('#ContentPlaceHolder1_ddlRegiaoClientes').select("BRASIL");
    cy.get('#ContentPlaceHolder1_btnAdicionarFiltro').click();
    cy.get('#ContentPlaceHolder1_btnTestarFiltro').click();
    cy.get('.ui-dialog-titlebar > .ui-dialog-titlebar-close').click();
    cy.get('#ContentPlaceHolder1_btnSalvarFechar').click();
    }

    function buscarNovaTabela(){
    // buscar tabela
    cy.get('#ContentPlaceHolder1_txtTabelaPrecoFiltro').type(nomeTabela);
    cy.get('#ContentPlaceHolder1_BtnProcurar').click();
    cy.get('tbody > :nth-child(2) > :nth-child(2)').should("contain.text", nomeTabela);
    
    }

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
        
        cy.get('#ContentPlaceHolder1_rptResultado_imgSelecionar_0').click();
        //Alterar preços do produto

        cy.contains('span',"Teste DNA-Reis-Franco")     // encontra o texto da coluna da esquerda -- nome da tabela criada
        .parent('tr')                   // sobe para o container que agrupa texto e inputs na mesma linha
        .within(() => {
        // aqui dentro, estamos apenas na linha certa
        
        // exemplo: clicar no primeiro input
        
        // ou, preencher o segundo input com um novo valor
        cy.get('input[id*="txtPrecoFabrica"]').eq(0).click().clear().type(precoFabrica); // criar constante de valor 

        
        // ou, preencher o psegundo input com um novo valor
        cy.get('input[id*="txtPrecoConsumidor"]').eq(1).click().clear().type(precoConsumidor);
        });
    cy.get('#ContentPlaceHolder1_rptResultado_BtnTabPrecosSalvar_0').click();

    }

    function buscaProdutoNovoPreco() {
    //busca novo preço produto        
        cy.get('#ContentPlaceHolder1_txtProdutoEANFiltro').type(EAN);
        cy.get('#ContentPlaceHolder1_BtnProcurar').click();
        cy.get('.gridRow > :nth-child(3)').should("contain.text",EAN);
        cy.get('#ContentPlaceHolder1_rptResultado_imgSelecionar_0').click();
        cy.contains("Teste DNA-Reis-Franco")         // Encontra a célula com a descrição
        .parent('tr')                      // Sobe para a linha inteira
        .within(() => {

            cy.get('input').eq(0).should('have.value',"1.223,2200");   // Preço Fábrica
            cy.get('input').eq(1).should('have.value',"1.223,5000"); // Preço Consumidor
        });
    }

    function buscarTabelaNovopreco() {
    //conferencia no cadastro da tabela
    cy.get('[accesskey="1"] > .sf-sub-indicator').click();
    cy.contains("Tabela Preço").click();
    cy.contains("Cadastro Tabela Preço").click();
    cy.get('#ContentPlaceHolder1_txtTabelaPrecoFiltro').type("Teste DNA-Reis-Franco");
    cy.get('#ContentPlaceHolder1_BtnProcurar').click();
    cy.get('tbody > :nth-child(2) > :nth-child(2)').should("contain.text","Teste DNA-Reis-Franco");
    cy.get('#ContentPlaceHolder1_rptResultado_imgSelecionar_0').click();
    cy.get('tbody > :nth-child(2) > :nth-child(1)').should("contain.text",EAN);
    cy.get('tbody > :nth-child(2) > :nth-child(3)').should('have.value',"1.223,2200");
    cy.get('tbody > :nth-child(2) > :nth-child(4)').should('have.value',"1.223,5000");
    }


   it ("Fluxo de Cadastro de Nova Tabela Preço", () => {
    
    cadastroNovaTabela();
    buscarNovaTabela();
    cy.wait(5000);
    buscaProduto();
    alteracaoPrecoProduto();
    buscaProdutoNovoPreco();
    //cy.wait(5000);
    //buscarTabelaNovopreco();
   });
   /*

   it("Alterar preço do produto", () => {
   
   

   });

   it("Validar Valores do produto salvo na tabela", () => {
        
   });*/
    

});
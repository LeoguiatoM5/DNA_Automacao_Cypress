import { faker } from "@faker-js/faker/locale/pt_BR";
import { cnpj } from "cpf-cnpj-validator";

const { registrarErrosJS } = require("../../../pages/tratamentos/errosJS.js");
registrarErrosJS();

describe("Cadastro de novo Distribuidor", () => {
  //Variáveis
  const cnpjDistribuidor = cnpj.generate();
  //const cnpjDistribuidor = "01448559000141";
  const nomeFantasiaDistribuidor = `Teste DNA-${faker.company.name()}`;
  const razaoSocialDistribuidor = `Teste DNA-${faker.company.name()}`;
  //const nomeFantasiaDistribuidor = "Distribuidor 4 DNA";
  const logradouro = "Rua TESTE";
  const bairro = "Centro";
  const cep = "14070080"

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

  function cadastroNovoDistribuidor() {
    cy.get(':nth-child(5) > .sf-with-ul').click();
    cy.contains("Cadastro de Distribuidor").click();
    cy.get('#ContentPlaceHolder1_btNovoMenu').click();
    cy.get('#ContentPlaceHolder1_PesCNPJ_CPF').type(cnpjDistribuidor);
    cy.get('#ContentPlaceHolder1_PesNomeFantasia').type(nomeFantasiaDistribuidor);
    cy.get('#ContentPlaceHolder1_PesRazaoSocial_Nome').type(razaoSocialDistribuidor);
    cy.get(':nth-child(1) > :nth-child(6) > .auto > :nth-child(2) > .slider').click();
  }

  function dadosNovoDistribuidor() {
    cy.get('#ContentPlaceHolder1_DDLGrupoDistribuidor').select("MAFRA");
    cy.get('#ContentPlaceHolder1_ddlOcorrenciaGrupo').select("Ocorrências ENTIRE REDE");
    }

  function estadosAtendidos() {
    cy.get(':nth-child(1) > :nth-child(1) > .ui-button-wrap-option').click();
    cy.get(':nth-child(2) > :nth-child(2) > .ui-button-wrap-option').click();
    cy.get(':nth-child(3) > :nth-child(3) > .ui-button-wrap-option').click();
    cy.get(':nth-child(4) > :nth-child(4) > .ui-button-wrap-option').click();
    cy.get(':nth-child(5) > :nth-child(5) > .ui-button-wrap-option').click();
  }
  function enderecoNovoDistribuidor() {
    cy.get('#ContentPlaceHolder1_btAddEndereco').click();    
    cy.get('#ContentPlaceHolder1_dlEndereco_idTipEndereco_0').select("COMERCIAL");
    cy.get('#ContentPlaceHolder1_dlEndereco_idEstado_0').select("SERGIPE");
    cy.get('#ContentPlaceHolder1_dlEndereco_idCidade_0').select("Capela");
    cy.get('#ContentPlaceHolder1_dlEndereco_EndLogradouro_0').type(logradouro);
    cy.get('#ContentPlaceHolder1_dlEndereco_EndBairro_0').type(bairro);
    cy.get('#ContentPlaceHolder1_dlEndereco_EndCep_0').type(cep);
    cy.get('td > .panel > :nth-child(6) > .auto > .switch > .slider').click();
    cy.get('#ContentPlaceHolder1_btEnviar').click(); 
  }

  function buscaNovoDistribuidor() {
    cy.get('#ContentPlaceHolder1_txtCPFCNPJ').type(cnpjDistribuidor)
    cy.get('#ContentPlaceHolder1_BtnProcurar').click(); 
    cy.get('tbody > :nth-child(2) > :nth-child(3)').should("contain.text",cnpjDistribuidor);    
  }

  it ("Fluxo de Cadastro de Novo Distribuidor", () => {    
    cy.log("Cadastrando novo distribudor");
    cadastroNovoDistribuidor();

    cy.log("Dados novo distribuidor");
    dadosNovoDistribuidor();

    cy.log("Estados de atendimento");
    estadosAtendidos();

    cy.log("Endereço distribuidor");
    enderecoNovoDistribuidor();

    cy.log("Busca novo distribuidor")
    buscaNovoDistribuidor();

  });
});

/*
Itens obrigatorios:
CNPJ
Nome Fantasia
Razão social
Grupo distribuidor
Grupo ocorrencia
Endereço tipo comercial


*/
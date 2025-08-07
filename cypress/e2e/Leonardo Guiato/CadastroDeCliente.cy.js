import { faker } from "@faker-js/faker/locale/pt_BR";
import { cnpj } from "cpf-cnpj-validator";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

const {
  validarCampoSemMascara,
  validarCampoSemCase,
} = require("../../pages/tratamentos/validacoesCampos.js");

describe("Cadastro de Cliente", () => {
  const cnpjGerado = cnpj.generate();
  const nomeFantasia = faker.company.name();
  const razaoSocial = faker.company.name();
  const CEP = "01001-000";
  const bairro = "Sé";
  const logradouro = "Praça da Sé";
  const numeroLogradouro = faker.number.int({ min: 1, max: 9999 }).toString();

  const novoBairro = "Bela Vista";
  const novoLogradouro = "Rua Rui Barbosa";
  const novoNumeroLogradouro = faker.number
    .int({ min: 1, max: 9999 })
    .toString();

  beforeEach(() => {
    // cy.visit() => Navega para a URL especificada
    // cy.get() => Seleciona um elemento DOM pelo seletor CSS
    // .type() => Digita texto no elemento selecionado
    // .click() => Clica no elemento selecionado
    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Especialidades/Acesso.aspx"
    );

    cy.get("#ContentPlaceHolder1_Control_Login2_Login1_UserName").type(
      "admbayer@dnaspecialty.com.br"
    );
    cy.get("#ContentPlaceHolder1_Control_Login2_Login1_Password").type(
      "1234568"
    );
    cy.get("#ContentPlaceHolder1_Control_Login2_Login1_LoginButton").click();
  });

  /**
    Função para cadastrar um cliente.
    Utiliza:
    - cy.get() para selecionar elementos na tela
    - cy.contains() para buscar elemento que contenha texto específico
    - .click() para clicar em botões ou abas
    - .type() para preencher campos de texto
    - cy.wait() para aguardar tempo fixo
    - .invoke(), .trigger(), .should() para manipular e validar valores de campos
   */
  function cadastroCliente() {
    cy.log(` CNPJ gerado: ${cnpjGerado}`);

    cy.get("#nav > :nth-child(3) > .sf-with-ul").click();
    cy.contains("Cadastro de Cliente").click();
    cy.get("#ContentPlaceHolder1_btNovoPDV").click();

    cy.wait(5000);

    cy.get("#ContentPlaceHolder1_trTipoDocumento").contains("JURIDICA").click();
    cy.get("#ContentPlaceHolder1_DDLTipoCli").select("CLIENTE - Bayer");

    cy.get("#ContentPlaceHolder1_PesRazaoSocial_Nome").type(razaoSocial);
    cy.get("#ContentPlaceHolder1_PesCNPJ_CPF").type(cnpjGerado);
    cy.get("h1").click();
    cy.get("#ContentPlaceHolder1_PopupCNPJ_ctl00_btCancelarPopup").click();

    cy.get("#ContentPlaceHolder1_PesNomeFantasia")
      .invoke("val", nomeFantasia)
      .trigger("input")
      .trigger("change")
      .trigger("blur")
      .should("have.value", nomeFantasia);

    cy.get("#ContentPlaceHolder1_ListSetorVenda").select("454");
    cy.get("#ContentPlaceHolder1_btnAddSetorVenda").click();
  }

  /**
   * Função para cadastrar o endereço do cliente.
   * Utiliza:
   * - cy.get() para selecionar campos do formulário de endereço
   * - .click() para abrir aba do endereço
   * - .type() e .select() para preencher campos
   * - cy.get("#ContentPlaceHolder1_btEnviar").click() para salvar
   * - cy.get("#ajaxLoading").should("not.be.visible") para aguardar fim do carregamento AJAX
   * - cy.wait() para esperar um tempo extra após carregamento
   */
  function cadastroEndereco() {
    cy.get("#liAbaEndereco").click();
    cy.get("#ContentPlaceHolder1_dlEndereco_EndCep_0").type(CEP);
    cy.get("#ContentPlaceHolder1_dlEndereco_ddlEstados_0").select("SP");
    cy.get("#ContentPlaceHolder1_dlEndereco_idCidade_0").select("São Paulo");
    cy.get("#ContentPlaceHolder1_dlEndereco_EndBairro_0").type(bairro);
    cy.get("#ContentPlaceHolder1_dlEndereco_EndLogradouro_0").type(logradouro);
    cy.get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0").type(
      numeroLogradouro
    );

    cy.get("#ContentPlaceHolder1_btEnviar").click();

    cy.get("#ajaxLoading", { timeout: 60000 }).should("not.be.visible");
  }

  /**
   * Função para buscar cliente pelo CNPJ.
   * Utiliza:
   * - cy.get() para selecionar campo de busca e botão
   * - .clear() para limpar campo antes de digitar
   * - .type() para inserir o CNPJ gerado
   * - .click() para acionar busca
   * - cy.get("#ajaxLoading").should("not.be.visible") para esperar carregamento AJAX
   * - cy.get().should("contain.text") para garantir que o resultado contém o CNPJ buscado
   */
  function buscarClientePorCNPJ() {
    cy.get("#ContentPlaceHolder1_txtCPFCNPJ").clear().type(cnpjGerado);
    cy.get("#ContentPlaceHolder1_BtnProcurar").click();

    cy.get("#ajaxLoading", { timeout: 60000 }).should("not.be.visible");
    cy.get(".gridRow > :nth-child(3)", { timeout: 10000 }).should(
      "contain.text",
      cnpjGerado
    );
  }

  /**
   * Função para validar os dados do cadastro do cliente.
   * Utiliza:
   * - cy.get().click() para selecionar o cliente nos resultados
   * - cy.get().should("be.visible") para garantir que os campos aparecem
   * - Funções externas validarCampoSemMascara e validarCampoSemCase para validar conteúdos dos campos
   * - cy.get().should() para validar texto selecionado em dropdowns
   */
  function validacaoCadastro() {
    cy.get("#ContentPlaceHolder1_rptResultado_imgSelecionar_0").click();

    cy.get("#ContentPlaceHolder1_PesCNPJ_CPF", { timeout: 50000 }).should(
      "be.visible"
    );

    validarCampoSemMascara("#ContentPlaceHolder1_PesCNPJ_CPF", cnpjGerado);
    validarCampoSemCase(
      "#ContentPlaceHolder1_PesRazaoSocial_Nome",
      razaoSocial
    );
    validarCampoSemCase("#ContentPlaceHolder1_PesNomeFantasia", nomeFantasia);

    cy.get("#ContentPlaceHolder1_ListSetorSelecionados > option").should(
      "contain.text",
      "(CARDIO) CAR005 Carlos Giorgenon"
    );

    cy.get("#liAbaEndereco").click();

    cy.get("#ContentPlaceHolder1_dlEndereco_EndCep_0").should("be.visible");
    cy.get("#ContentPlaceHolder1_dlEndereco_ddlEstados_0")
      .find(":selected")
      .should("contain.text", "SP");
    cy.get("#ContentPlaceHolder1_dlEndereco_idCidade_0")
      .find(":selected")
      .should("contain.text", "São Paulo");

    validarCampoSemCase("#ContentPlaceHolder1_dlEndereco_EndBairro_0", bairro);
    validarCampoSemCase(
      "#ContentPlaceHolder1_dlEndereco_EndLogradouro_0",
      logradouro
    );

    cy.get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0").should(
      "have.value",
      numeroLogradouro
    );
  }

  /**
   * Função para editar o endereço do cliente.
   * Utiliza:
   * - cy.get() para selecionar os campos de endereço
   * - .clear() e .type() para alterar os dados
   * - .click() para salvar alterações
   * - cy.get("#ajaxLoading").should("not.be.visible") para aguardar término do processo AJAX
   */
  function edicaoEndereco() {
    cy.get("#ContentPlaceHolder1_dlEndereco_EndBairro_0")
      .clear()
      .type(novoBairro);
    cy.get("#ContentPlaceHolder1_dlEndereco_EndLogradouro_0")
      .clear()
      .type(novoLogradouro);
    cy.get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0")
      .clear()
      .type(novoNumeroLogradouro);

    cy.get("#ContentPlaceHolder1_btEnviar").click();
    cy.get("#ajaxLoading", { timeout: 60000 }).should("not.be.visible");
  }

  /**
   * Função para validar o endereço editado.
   * Utiliza:
   * - Função buscarClientePorCNPJ para localizar cliente
   * - cy.get().click() para abrir detalhes do cliente
   * - cy.get().click() para abrir aba de endereço
   * - cy.get().should("be.visible") para garantir que os campos estão visíveis
   * - Funções validarCampoSemCase para validar valores dos campos de texto
   * - cy.get().should("have.value") para verificar valor do campo número do logradouro
   */
  function validarEnderecoEditado() {
    buscarClientePorCNPJ();
    cy.get("#ContentPlaceHolder1_rptResultado_imgSelecionar_0").click();
    cy.get("#liAbaEndereco").click();
    cy.get("#ContentPlaceHolder1_dlEndereco_EndCep_0").should("be.visible");

    validarCampoSemCase(
      "#ContentPlaceHolder1_dlEndereco_EndBairro_0",
      novoBairro
    );
    validarCampoSemCase(
      "#ContentPlaceHolder1_dlEndereco_EndLogradouro_0",
      novoLogradouro
    );
    cy.get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0").should(
      "have.value",
      novoNumeroLogradouro
    );
  }

  it("Fluxo completo de cadastro, busca, validação e edição de endereço de cliente", () => {
    cy.log(" Iniciando cadastro do cliente");
    cadastroCliente();

    cy.log("Cadastro do endereço");
    cadastroEndereco();

    cy.log(" Buscando cliente pelo CNPJ");
    buscarClientePorCNPJ();

    cy.log(" Validando cadastro do cliente");
    validacaoCadastro();

    cy.log(" Editando endereço do cliente");
    edicaoEndereco();

    cy.log(" Validando endereço editado");
    validarEnderecoEditado();
  });
});

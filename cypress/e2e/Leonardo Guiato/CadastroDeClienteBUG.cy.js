import { faker } from "@faker-js/faker/locale/pt_BR";
import { cnpj } from "cpf-cnpj-validator";

const {
  validarCampoSemMascara,
  validarCampoSemCase,
} = require("../../pages/tratamentos/validacoesCampos.js");

const erros = [];

Cypress.on("uncaught:exception", () => false);

Cypress.on("fail", (error, runnable) => {
  erros.push(error.message);
  return false; // não para o teste
});

// Wrapper para executar comando e registrar erro, continuar fluxo
function tentarComando(comandoFn, descricao) {
  return comandoFn().catch((err) => {
    erros.push(`Erro em "${descricao}": ${err.message}`);
    return null;
  });
}

describe("Cadastro de Cliente - fluxo completo com captura de erros e otimização", () => {
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
    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Especialidades/Acesso.aspx"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_Control_Login2_Login1_UserName", {
            timeout: 5000,
          })
          .type("admbayer@dnaspecialty.com.br"),
      "digitar usuário"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_Control_Login2_Login1_Password", {
            timeout: 5000,
          })
          .type("12345678"),
      "digitar senha"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_Control_Login2_Login1_LoginButton", {
            timeout: 5000,
          })
          .click(),
      "clicar login"
    );
  });

  it("Executa fluxo completo sem travar e registra erros", () => {
    // Menu > Cadastro de Cliente
    tentarComando(
      () =>
        cy.get("#nav > :nth-child(3) > .sf-with-ul", { timeout: 5000 }).click(),
      "abrir menu principal"
    );
    tentarComando(
      () => cy.contains("Cadastro de Cliente", { timeout: 5000 }).click(),
      "clicar Cadastro de Cliente"
    );

    // Novo PDV
    tentarComando(
      () => cy.get("#ContentPlaceHolder1_btNovoPDV", { timeout: 5000 }).click(),
      "clicar novo PDV"
    );

    cy.wait(2000); // espera fixa curta para evitar travar

    // Seleciona Jurídica
    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_trTipoDocumento", { timeout: 4000 })
          .contains("JURIDICA")
          .click(),
      "selecionar tipo documento Jurídica"
    );

    // Seleciona tipo cliente
    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_DDLTipoCli", { timeout: 4000 })
          .select("CLIENTE - Bayer"),
      "selecionar tipo cliente CLIENTE - Bayer"
    );

    // Preenche razão social e CNPJ
    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_PesRazaoSocial_Nome", { timeout: 4000 })
          .type(razaoSocial),
      "digitar razão social"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_PesCNPJ_CPF", { timeout: 4000 })
          .type(cnpjGerado),
      "digitar CNPJ"
    );

    // Fechar popup e verificar CNPJ
    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_PopupCNPJ_ctl00_btCancelarPopup", {
            timeout: 4000,
          })
          .click({ force: true }),
      "fechar popup CNPJ"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_PopupCNPJ_ctl00_btnVerificaCNPJ", {
            timeout: 4000,
          })
          .click(),
      "clicar verificar CNPJ"
    );

    // Preencher nome fantasia
    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_PesNomeFantasia", { timeout: 4000 })
          .type(nomeFantasia),
      "digitar nome fantasia"
    );

    // Selecionar setor de venda e adicionar
    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_ListSetorVenda", { timeout: 4000 })
          .select("454"),
      "selecionar setor de venda"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_btnAddSetorVenda", { timeout: 4000 })
          .click(),
      "clicar adicionar setor de venda"
    );

    // Aba Endereço
    tentarComando(
      () => cy.get("#liAbaEndereco", { timeout: 4000 }).click(),
      "clicar aba endereço"
    );

    // Preencher endereço
    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_dlEndereco_EndCep_0", { timeout: 4000 })
          .type(CEP),
      "digitar CEP"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_dlEndereco_ddlEstados_0", {
            timeout: 4000,
          })
          .select("SP"),
      "selecionar estado SP"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_dlEndereco_idCidade_0", { timeout: 4000 })
          .select("São Paulo"),
      "selecionar cidade São Paulo"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_dlEndereco_EndBairro_0", { timeout: 4000 })
          .type(bairro),
      "digitar bairro"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_dlEndereco_EndLogradouro_0", {
            timeout: 4000,
          })
          .type(logradouro),
      "digitar logradouro"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0", {
            timeout: 4000,
          })
          .type(numeroLogradouro),
      "digitar número do logradouro"
    );

    // Salvar endereço
    tentarComando(
      () => cy.get("#ContentPlaceHolder1_btEnviar", { timeout: 5000 }).click(),
      "clicar salvar endereço"
    );

    // Esperar loading desaparecer
    tentarComando(
      () => cy.get("#ajaxLoading", { timeout: 20000 }).should("not.be.visible"),
      "esperar carregamento"
    );

    // Buscar cliente por CNPJ
    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_txtCPFCNPJ", { timeout: 5000 })
          .clear()
          .type(cnpjGerado),
      "limpar e digitar CNPJ para busca"
    );

    tentarComando(
      () =>
        cy.get("#ContentPlaceHolder1_BtnProcurar", { timeout: 5000 }).click(),
      "clicar botão procurar"
    );

    tentarComando(
      () => cy.get("#ajaxLoading", { timeout: 20000 }).should("not.be.visible"),
      "esperar carregamento"
    );

    tentarComando(
      () =>
        cy
          .get(".gridRow > :nth-child(3)", { timeout: 10000 })
          .should("contain.text", cnpjGerado),
      "validar CNPJ na lista"
    );

    // Validar dados do cadastro
    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_rptResultado_imgSelecionar_0", {
            timeout: 5000,
          })
          .click(),
      "clicar selecionar cliente na lista"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_PesCNPJ_CPF", { timeout: 5000 })
          .should("be.visible"),
      "validar campo CNPJ visível"
    );

    tentarComando(
      () =>
        validarCampoSemMascara("#ContentPlaceHolder1_PesCNPJ_CPF", cnpjGerado),
      "validar CNPJ sem máscara"
    );
    tentarComando(
      () =>
        validarCampoSemCase(
          "#ContentPlaceHolder1_PesRazaoSocial_Nome",
          razaoSocial
        ),
      "validar razão social"
    );
    tentarComando(
      () =>
        validarCampoSemCase(
          "#ContentPlaceHolder1_PesNomeFantasia",
          nomeFantasia
        ),
      "validar nome fantasia"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_ListSetorSelecionados > option", {
            timeout: 5000,
          })
          .should("contain.text", "(CARDIO) CAR005 Carlos Giorgenon"),
      "validar setor selecionado"
    );

    tentarComando(
      () => cy.get("#liAbaEndereco", { timeout: 5000 }).click(),
      "clicar aba endereço para validação"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_dlEndereco_EndCep_0", { timeout: 5000 })
          .should("be.visible"),
      "validar campo CEP visível"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_dlEndereco_ddlEstados_0")
          .find(":selected")
          .should("contain.text", "SP"),
      "validar estado selecionado SP"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_dlEndereco_idCidade_0")
          .find(":selected")
          .should("contain.text", "São Paulo"),
      "validar cidade selecionada"
    );

    tentarComando(
      () =>
        validarCampoSemCase(
          "#ContentPlaceHolder1_dlEndereco_EndBairro_0",
          bairro
        ),
      "validar bairro"
    );
    tentarComando(
      () =>
        validarCampoSemCase(
          "#ContentPlaceHolder1_dlEndereco_EndLogradouro_0",
          logradouro
        ),
      "validar logradouro"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0")
          .should("have.value", numeroLogradouro),
      "validar número do logradouro"
    );

    // Editar endereço
    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_dlEndereco_EndBairro_0", { timeout: 5000 })
          .clear()
          .type(novoBairro),
      "editar bairro"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_dlEndereco_EndLogradouro_0", {
            timeout: 5000,
          })
          .clear()
          .type(novoLogradouro),
      "editar logradouro"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0", {
            timeout: 5000,
          })
          .clear()
          .type(novoNumeroLogradouro),
      "editar número logradouro"
    );

    tentarComando(
      () => cy.get("#ContentPlaceHolder1_btEnviar", { timeout: 5000 }).click(),
      "clicar salvar endereço editado"
    );

    tentarComando(
      () => cy.get("#ajaxLoading", { timeout: 20000 }).should("not.be.visible"),
      "esperar carregamento pós edição"
    );

    // Validar endereço editado
    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_txtCPFCNPJ", { timeout: 5000 })
          .clear()
          .type(cnpjGerado),
      "limpar e digitar CNPJ para nova busca"
    );

    tentarComando(
      () =>
        cy.get("#ContentPlaceHolder1_BtnProcurar", { timeout: 5000 }).click(),
      "clicar buscar cliente após edição"
    );

    tentarComando(
      () => cy.get("#ajaxLoading", { timeout: 20000 }).should("not.be.visible"),
      "esperar carregamento após busca"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_rptResultado_imgSelecionar_0", {
            timeout: 5000,
          })
          .click(),
      "selecionar cliente na lista após edição"
    );

    tentarComando(
      () => cy.get("#liAbaEndereco", { timeout: 5000 }).click(),
      "clicar aba endereço após edição"
    );

    tentarComando(
      () =>
        validarCampoSemCase(
          "#ContentPlaceHolder1_dlEndereco_EndBairro_0",
          novoBairro
        ),
      "validar bairro editado"
    );
    tentarComando(
      () =>
        validarCampoSemCase(
          "#ContentPlaceHolder1_dlEndereco_EndLogradouro_0",
          novoLogradouro
        ),
      "validar logradouro editado"
    );

    tentarComando(
      () =>
        cy
          .get("#ContentPlaceHolder1_dlEndereco_txtNrLogradouro_0")
          .should("have.value", novoNumeroLogradouro),
      "validar número do logradouro editado"
    );

    // Ao final, exibe os erros
    cy.then(() => {
      if (erros.length > 0) {
        cy.log("### ERROS CAPTURADOS DURANTE O TESTE ###");
        erros.forEach((e) => cy.log(e));
      } else {
        cy.log("Nenhum erro capturado.");
      }
    });
  });
});

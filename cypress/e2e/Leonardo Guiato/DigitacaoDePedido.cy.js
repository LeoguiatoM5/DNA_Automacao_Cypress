const {
  validarCampoSemMascara,
  validarCampoSemCase,
} = require("../../pages/tratamentos/validacoesCampos.js");

Cypress.on("uncaught:exception", () => false);

describe("Validação Cálculo Preço Líquido", () => {
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

  function aplicarEValidar(produto, index) {
    const campoQtd = `#ContentPlaceHolder1_rptProduto_txtQtdProduto_${index}`;
    const campoDesc = `#ContentPlaceHolder1_rptProduto_txtDescontoNeg_${index}`;
    const campoLiq = `#ContentPlaceHolder1_rptProduto_txtPrecoLiquido_${index}`;

    const precoUnitarioCalculado = parseFloat(
      (produto.precoFab * (1 - produto.desc / 100)).toFixed(2)
    );

    const precoEsperado = precoUnitarioCalculado.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const totalEsperado = (precoUnitarioCalculado * produto.qtd).toLocaleString(
      "pt-BR",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

    cy.log(` Produto: ${produto.nome}`);
    cy.log(`Preço Fábrica: R$ ${produto.precoFab.toLocaleString("pt-BR")}`);
    cy.log(`Desconto: ${produto.desc.toFixed(2)}%`);
    cy.log(`Quantidade: ${produto.qtd}`);
    cy.log(
      `Cálculo: ${produto.precoFab} × (1 - ${
        produto.desc / 100
      }) = ${precoEsperado}`
    );
    cy.log(`Valor Total Esperado: ${totalEsperado}`);

    cy.get(campoQtd).clear().type(String(produto.qtd));
    cy.wait(1000);
    cy.get("body").click(0, 0);

    cy.get(campoDesc).clear().type(produto.desc.toFixed(2).replace(".", ","));
    cy.wait(1000);
    cy.get("body").click(0, 0);
    cy.wait(3000);

    cy.get(campoLiq, { timeout: 10000 }).should(($input) => {
      const valorAtual = $input.val().trim();
      console.log(" VALOR EXIBIDO:", valorAtual, "| ESPERADO:", precoEsperado);
      expect(valorAtual).to.eq(precoEsperado);
    });

    cy.log(` Preço Líquido Validado: ${precoEsperado}`);
  }

  it("Valida Preço Líquido de vários produtos reutilizando os campos", () => {
    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Especialidades/Pedido/CriacaoEdicaoPedidoDesc.aspx?cod=12737884-A517-4E87-9AB1-42BB797CC1B5|2168"
    );

    cy.get("#ContentPlaceHolder1_txtFiltroCNPJ").type("28.528.533/0001-60");
    cy.get("#ContentPlaceHolder1_btnBuscarCliente").click();
    cy.get("#ajaxLoading", { timeout: 100000 }).should("not.be.visible");
    cy.get("#ContentPlaceHolder1_rptCliente_imgSelecionar_0").click();

    cy.get("#ContentPlaceHolder1_ddlSetor").select(
      "(OFTALMO) OC003 DOUGLAS CLAUDINO"
    );
    cy.get("#ContentPlaceHolder1_ddlCondicaoComercial").select(
      "MA_ESP_POLITICA COMERCIAL MARKET ACCESS INDIRETO 2025 2026 - JULHO"
    );

    const produtos = [
      { nome: "Produto 1", precoFab: 5417.16, desc: 52, qtd: 1 },
      { nome: "Produto 2", precoFab: 8125.73, desc: 68, qtd: 1 },
      { nome: "Produto 3", precoFab: 5417.16, desc: 58, qtd: 1 },
      { nome: "Produto 4", precoFab: 8125.73, desc: 25, qtd: 1 },
      { nome: "Produto 5", precoFab: 5417.16, desc: 15.5, qtd: 1 },
      { nome: "Produto 6", precoFab: 8125.73, desc: 40, qtd: 1 },
    ];

    for (let i = 0; i < produtos.length; i += 2) {
      aplicarEValidar(produtos[i], 0);
      if (produtos[i + 1]) aplicarEValidar(produtos[i + 1], 1);
    }
  });
});

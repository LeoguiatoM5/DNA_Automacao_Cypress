const { registrarErrosJS } = require("../../pages/tratamentos/errosJS.js");
const { cadastroCliente } = require("../../pages/Functions/funcoes.js");

registrarErrosJS();

describe("Descrição do Teste", () => {
  //Variáveis

  beforeEach(() => {
    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Especialidades/Acesso.aspx"
    );
  });
});

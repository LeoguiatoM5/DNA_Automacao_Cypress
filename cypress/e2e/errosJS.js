let errosJS = [];

function registrarErrosJS() {
  Cypress.on("uncaught:exception", (err) => {
    errosJS.push(err.message);
    return false;
  });

  afterEach(() => {
    if (errosJS.length > 0) {
      const mensagensTraduzidas = errosJS.map((erro, i) => {
        const msg = `Erro ${i + 1}: ${traduzirErro(erro)}`;
        cy.log(msg);
        return msg;
      });

      cy.task("logErrosJS", mensagensTraduzidas.join("\n"));

      errosJS = [];
    }
  });
}

function traduzirErro(mensagem) {
  const traducoes = [
    { original: "is not defined", traducao: "não está definido" },
    { original: "unexpected token", traducao: "símbolo inesperado" },
    { original: "undefined", traducao: "não definido" },
    { original: "null", traducao: "nulo" },
  ];
  for (const { original, traducao } of traducoes) {
    if (mensagem.includes(original)) {
      return mensagem.replace(original, traducao);
    }
  }
  return mensagem;
}

module.exports = { registrarErrosJS };

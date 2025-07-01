function validarCampoSemMascara(selector, valorEsperado) {
  cy.get(selector, { timeout: 10000 })
    .should("be.visible")
    .invoke("val")
    .then((val) => {
      const valSemMascara = val.replace(/\D/g, "");
      expect(valSemMascara).to.equal(valorEsperado);
    });
}

function validarCampoSemCase(selector, valorEsperado) {
  cy.get(selector, { timeout: 10000 })
    .should("be.visible")
    .invoke("val")
    .then((val) => {
      expect(val.toLowerCase()).to.equal(valorEsperado.toLowerCase());
    });
}

module.exports = {
  validarCampoSemMascara,
  validarCampoSemCase,
};

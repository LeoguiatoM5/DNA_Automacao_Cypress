function validarCampoSemMascara(selector, valorEsperado) {
  cy.get(selector, { timeout: 10000 })
    .should("be.visible")
    .invoke("val")
    .then((val) => {
      const valSemMascara = val.replace(/\D/g, "");
      expect(valSemMascara).to.equal(valorEsperado);
    });
}

function validarCampoSemCase(seletor, valorEsperado) {
  cy.get(seletor)
    .should("exist")
    .should("be.visible")
    .invoke("val")
    .then((valorObtido) => {
      expect(valorObtido?.toLowerCase().trim()).to.eq(
        valorEsperado.toLowerCase().trim()
      );
    });
}

module.exports = {
  validarCampoSemMascara,
  validarCampoSemCase,
};

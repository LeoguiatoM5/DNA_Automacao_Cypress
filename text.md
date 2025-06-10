Cypress.on('uncaught:exception', (err, runnable) => {
return false;
});

    cy.get("#ContentPlaceHolder1_btNovoPDV").click();
    cy.get('#ContentPlaceHolder1_trTipoDocumento').contains('JURIDICA').click();
    cy.get('#ContentPlaceHolder1_DDLTipoCli').select("CLIENTE - Bayer");
    cy.get('#ContentPlaceHolder1_dlCaracteristicas_DropCaracteristica_0').select("NAO")


    npx cypress run --spec "cypress/e2e/login.cy.js"


    cy.get('#ajaxLoading', { timeout: 10000 }).should('not.be.visible');

cy.get('#ContentPlaceHolder1_PesCNPJ_CPF').type('93094988000186');

cy.get('#ContentPlaceHolder1_PesCNPJ_CPF').type('93094988000186', { force: true });

cy.intercept('POST', '**/admPdv.aspx**').as('addSetor');

cy.intercept('POST', '**/admPdv.aspx**').as('addSetor');

cy.get("#ContentPlaceHolder1_ListSetorVenda").select("452");
cy.get("#ContentPlaceHolder1_btnAddSetorVenda").click();

cy.wait('@addSetor');

cy.get("#ContentPlaceHolder1_ListSetorSelecionados")
.find("option")
.should("contain", "452");

npm run test:report
npx cypress run --spec "cypress/e2e/fluxoCadastroClienteOtimizado.cy.js"
cy.get("#ajaxLoading", { timeout: 1000000 }).should("not.be.visible");




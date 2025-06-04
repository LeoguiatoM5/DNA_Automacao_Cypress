Cypress.on('uncaught:exception', (err, runnable) => {
      return false; 
    });




    cy.get("#ContentPlaceHolder1_btNovoPDV").click();
    cy.get('#ContentPlaceHolder1_trTipoDocumento').contains('JURIDICA').click();
    cy.get('#ContentPlaceHolder1_DDLTipoCli').select("CLIENTE - Bayer");        
    cy.get('#ContentPlaceHolder1_dlCaracteristicas_DropCaracteristica_0').select("NAO")


    npx cypress run --spec "cypress/e2e/login.cy.js"
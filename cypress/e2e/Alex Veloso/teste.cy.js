const { registrarErrosJS } = require("../../pages/tratamentos/errosJS.js");
registrarErrosJS();

describe("Descrição do Teste", () => {
  //Variáveis


   it ("Fluxo de Cadastro de Novo Distribuidor", () => { 
 
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

});



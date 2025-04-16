describe("Cliente Novartis", () => {
  beforeEach(() => {
    cy.visit(
      "https://homologacaoesp.interplayers.com.br/PRJ/Novartis/Acesso.aspx"
    );
    cy.get("#ContentPlaceHolder1_Control_pnlLogin_Login1_UserName").should(
      "be.visible"
    );
  });

  it("Caso de Teste: Login Inválido", () => {
    cy.get("#ContentPlaceHolder1_Control_pnlLogin_Login1_UserName").type("Ent");
    cy.get("#ContentPlaceHolder1_Control_pnlLogin_Login1_Password").type(
      "12378"
    );
    cy.get("#ContentPlaceHolder1_Control_pnlLogin_Login1_LoginButton").click();

    cy.get(":nth-child(3) > td").should(
      "contain",
      "Usuário ou Senha inválidos."
    );
  });

  it("Caso de teste: Fluxo com Login Válido, Acesse a Abas e subMenus", () => {
    cy.get("#ContentPlaceHolder1_Control_pnlLogin_Login1_UserName").type(
      "entire"
    );
    cy.get("#ContentPlaceHolder1_Control_pnlLogin_Login1_Password").type(
      "12345678"
    );
    cy.get("#ContentPlaceHolder1_Control_pnlLogin_Login1_LoginButton").click();
    cy.get("#nav > :nth-child(2) > :nth-child(1)").click();
    cy.contains("Tabela de Preço").click();
    cy.contains("Cadastro de tabelas de preço").click();
    cy.get("#cphFiltro_txtTabelaPrecoFiltro").type("PRECOFABRICA");
    cy.get("#cphFiltro_BtnProcurar").click();
  });
});

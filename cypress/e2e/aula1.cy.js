


describe('Teste e2e', ()=>{   // 
  beforeEach(()=>{   // beforeEach roda antes de cada teste
    cy.visit('https://practicetestautomation.com/practice-test-login/')// navega para a url
  })

  it('Login com usuario e senha invalidos', ()=>{ // teste de login com usuario e senha invalidos
    cy.get('#username').type('teste')
    cy.get('#password').type('123456')
    cy.get('#submit').click()
    cy.contains('Your username is invalid!')
    
  })
    






})
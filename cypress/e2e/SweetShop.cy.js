describe('Acessar e realizar login e manter a sessão', () => {
  it('Falha no teste', () => {
    cy.visit('https://sweetshop.netlify.app/')
    cy.visit('https://sweetshop.netlify.app/login')
    cy.get('#exampleInputEmail.form-control').clear().type('test@user.com')
    cy.get('#exampleInputPassword.form-control').clear().type('qwerty')
    cy.get('.btn.btn-primary').click()
    cy.contains('Welcome back test@user.com').should('be.visible')
    cy.visit('https://sweetshop.netlify.app/login')
    cy.contains('Welcome back test@user.com').should('be.visible')
  })
})

describe('Calcular o valor dos produtos', () => {
  it('Resultado esperado 5,00 Euros no carrinho', () => {
    cy.visit('https://sweetshop.netlify.app/')
    cy.contains('Sweets').click()
    for (let i = 0; i < 5; i++) {
      cy.get('a[data-name="Chocolate Cups"]').click();
    }
    cy.contains('Basket').click()
    cy.contains('£5.00').should('be.visible')
  })
});

describe('Deletar um produto do carrinho', () => {
  it('Exclui o produto do carrinho', () => {
    cy.visit('https://sweetshop.netlify.app/')
    cy.contains('Sweets').click()
    cy.get('a[data-name="Chocolate Cups"]').click();
    cy.contains('Basket').click()
    cy.get('a.small[href="javascript:removeItem(1);"]').click();
    cy.get('a.small[href="javascript:removeItem(1);"]').should('not.exist')
  })
})

describe('Exibe a imagem dos itens do catalogo', () => {
  it('Exibe a imagem dos produtos', () => {
    cy.visit('https://sweetshop.netlify.app/')
    cy.contains('Sweets').click()
    cy.get('.card').each(($card) => {
      cy.wrap($card).find('img').should('have.attr', 'src').and('not.include', 'broken-image.jpg')
      cy.wrap($card).find('img').should('have.prop', 'naturalWidth').and('be.greaterThan', 0)
    })
  })
})

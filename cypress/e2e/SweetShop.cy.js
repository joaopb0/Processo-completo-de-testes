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

describe('Verificar o redirecionamento para as redes sociais', () => {
  it('Redireciona para o Facebook', () => {
    cy.visit('https://sweetshop.netlify.app/')
    cy.contains('Login').click()
    cy.get('img[alt="facebook"]').click();
    cy.contains('Facebook').should('be.visible')
  })
})

describe('Teste de validação de checkout', () => {
  it('Valida o checkout', () => {
    cy.visit('https://sweetshop.netlify.app/')
    cy.contains('Sweets').click()
    cy.get('a[data-name="Chocolate Cups"]').click()
    cy.contains('Basket').click()
    cy.get('input#name').eq(0).type('Joao')
    cy.get('input#name').eq(1).type('Barbosa')
    cy.get('#email.form-control').clear().type('joao@gmail.com')
    cy.get('#address.form-control').clear().type('Rua A n° 1')
    cy.get('#email.form-control').clear().type('joao@gmail.com')
    cy.get('.custom-select').eq(0).select('United Kingdom');
    cy.get('.custom-select').eq(1).select('Bristol');
    cy.get('#email.form-control').clear().type('joao@gmail.com')
    cy.get('#zip.form-control').clear().type('95959656')
    cy.get('#cc-name.form-control').clear().type('joao das quantas nao sei o que')
    cy.get('#cc-number.form-control').clear().type('959565654456313')
    cy.get('#cc-expiration.form-control').clear().type('29')
    cy.get('#cc-cvv.form-control').clear().type('656')
    cy.contains('Continue to checkout').click()
    cy.get('input#name').eq(0).should('not.have.value', 'Joao')
    cy.get('input#name').eq(1).should('not.have.value', 'Barbosa')
  })
})

describe('Teste de retorno de erro de checkout', () => {
  it('Valida a tratativa de caracter invalido', () => {
    cy.visit('https://sweetshop.netlify.app/')
    cy.contains('Sweets').click()
    cy.get('a[data-name="Chocolate Cups"]').click()
    cy.contains('Basket').click()
    cy.get('input#name').eq(0).type('Joao')
    cy.get('input#name').eq(1).type('Barbosa')
    cy.get('#email.form-control').clear().type('joao@gmail.com')
    cy.get('#address.form-control').clear().type('Rua A n° 1')
    cy.get('#email.form-control').clear().type('joao@gmail.com')
    cy.get('.custom-select').eq(0).select('United Kingdom');
    cy.get('.custom-select').eq(1).select('Bristol');
    cy.get('#email.form-control').clear().type('joao@gmail.com')
    cy.get('#zip.form-control').clear().type('95959656')
    cy.get('#cc-name.form-control').clear().type('joao das quantas nao sei o que')
    cy.get('#cc-number.form-control').clear().type('Nao e pra colocar letras aqui')
    cy.get('#cc-expiration.form-control').clear().type('29')
    cy.get('#cc-cvv.form-control').clear().type('656')
    cy.contains('Continue to checkout').click()
    cy.contains('Credit card number is required').should('be.visible')
  })
})

describe('Teste de exibição de historico', () => {
  it('Valida a exibição do historico', () => {
    cy.visit('https://sweetshop.netlify.app/')
    cy.visit('https://sweetshop.netlify.app/login')
    cy.get('#exampleInputEmail.form-control').clear().type('test@user.com')
    cy.get('#exampleInputPassword.form-control').clear().type('qwerty')
    cy.get('.btn.btn-primary').click()
    cy.contains('Welcome back test@user.com').should('be.visible')
    cy.visit('https://sweetshop.netlify.app/')
    cy.contains('Sweets').click()
    cy.get('a[data-name="Chocolate Cups"]').click()
    cy.contains('Basket').click()
    cy.get('input#name').eq(0).type('Joao')
    cy.get('input#name').eq(1).type('Barbosa')
    cy.get('#email.form-control').clear().type('joao@gmail.com')
    cy.get('#address.form-control').clear().type('Rua A n° 1')
    cy.get('#email.form-control').clear().type('joao@gmail.com')
    cy.get('.custom-select').eq(0).select('United Kingdom');
    cy.get('.custom-select').eq(1).select('Bristol');
    cy.get('#email.form-control').clear().type('joao@gmail.com')
    cy.get('#zip.form-control').clear().type('95959656')
    cy.get('#cc-name.form-control').clear().type('joao das quantas nao sei o que')
    cy.get('#cc-number.form-control').clear().type('959565654456313')
    cy.get('#cc-expiration.form-control').clear().type('29')
    cy.get('#cc-cvv.form-control').clear().type('656')
    cy.contains('Continue to checkout').click()
    cy.visit('https://sweetshop.netlify.app/00efc23d-b605-4f31-b97b-6bb276de447e.html')
    cy.contains('#4').should('be.visible')
  })
})

describe('Teste de ordenação do historico', () => {
  it('Ordena o historico', () => {
    cy.visit('https://sweetshop.netlify.app/')
    cy.visit('https://sweetshop.netlify.app/00efc23d-b605-4f31-b97b-6bb276de447e.html')
    cy.contains('Order Number').should('be.visible').and('not.be.disabled').click();
    cy.contains('Date Ordered').should('be.visible').and('not.be.disabled').click();
    cy.contains('Order Description').should('be.visible').and('not.be.disabled').click();
    cy.contains('Order Total').should('be.visible').and('not.be.disabled').click();
  })
})

describe('Teste de acessar o perfil', () => {
  it('Acessa o perfil do usuario', () => {
    cy.visit('https://sweetshop.netlify.app/')
    cy.visit('https://sweetshop.netlify.app/login')
    cy.get('#exampleInputEmail.form-control').clear().type('test@user.com')
    cy.get('#exampleInputPassword.form-control').clear().type('qwerty')
    cy.get('.btn.btn-primary').click()
    cy.contains('Welcome back test@user.com').should('be.visible')
    cy.contains('test@user.com').click()
    cy.contains('Welcome back test@user.com').should('not.be.visible')
  })
})

describe('Teste de adicionar produtos ao carrinho', () => {
  it('Adiciona produtos ao carrinho', () => {
    cy.visit('https://sweetshop.netlify.app/')
    cy.contains('Sweets').click()
    cy.get('a[data-name="Chocolate Cups"]').click()
    cy.contains('Basket').click()
    cy.contains('Chocolate Cups').should('be.visible')
  })
})

describe('Teste de deletar todos os produtos do carrinho', () => {
  it('Deleta todos os produtos do carrinho', () => {
    cy.visit('https://sweetshop.netlify.app/')
    cy.contains('Sweets').click()
    cy.get('a[data-name="Chocolate Cups"]').click()
    cy.get('a[data-name="Sherbert Straws"]').click()
    cy.contains('Basket').click()
    cy.contains('Empty Basket').click()
    cy.on('window:confirm', () => true)
    cy.contains('Sherbert Straws').should('not.exist')
    cy.contains('Chocolate Cups').should('not.exist')
  })
})
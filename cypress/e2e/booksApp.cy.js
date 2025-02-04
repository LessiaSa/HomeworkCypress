

// describe('template spec', () => {
//
  // beforeEach(() => {
    // cy.visit('http://localhost:3000/');
  // });
//
  // it('passes', () => {
    // cy.login('test@test.com', 'test');
    // cy.contains('Log out').should('be.visible');
    // cy.contains('Добро пожаловать test@test.com').should('be.visible');
  // });
//
  // it('Пустой пароль', () => {
    // cy.login('test@test.com');
    // cy
      // .get('#pass')
      // .then((element) => element[0].checkValidity())
      // .should('be.false');
  // });
// });
const sizes = ['iphone-6', 'ipad-2', [1024, 768]]
describe('Book transactions', () => {

  beforeEach(() => {
    cy.visit("/");
    cy.login('test@test.com', 'test');
  });

  sizes.forEach((size) => {
    it('Adding a new book', () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }
      cy.contains('Add new').click();
      cy.get('#title').type('Евгений Онегин');
      cy.get('#description').type(
        'Не мысля гордый свет забавить Вниманье дружбы возлюбя'
      );
      cy.get('#authors').type('Александр Сергеевич Пушкин');
      cy.contains('Submit').click();
      //cy.get('.btn-dark').click();
      cy.contains('Add to favorite').should('be.visible');
    });

    it('Adding a book to favorites', () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }
      cy.contains('Евгений Онегин').should('be.visible');
      cy.contains('Add to favorite').click();
      cy.contains('Delete from favorite').should('be.visible');
    });

    it('Deleting a book from favorites', () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }
      cy.contains('Favorites').should('be.visible');
      cy.get('h4').click();
      cy.contains('Евгений Онегин').should('be.visible').true;
      cy.get('.card-footer > .btn').click();
      cy.contains('Евгений Онегин').should('not.exist');
    });
  })
});
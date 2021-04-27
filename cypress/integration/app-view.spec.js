describe('Burrito Builder Homepage Features', () => {

  beforeEach(() => {

    cy.intercept({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/orders'
    },
      {
        statusCode: 201,
        body: {
          orders: [
            { id: 1, name: 'Worm', ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno'] },
            { id: 2, name: 'Fish', ingredients: ['beans', 'hot sauce', 'steak', 'sour cream'] },
            { id: 3, name: 'Doggy', ingredients: ['lettuce', 'guacamole', 'queso fresco'] }
          ]
        }
      });
    cy.visit('http://localhost:3000');
  });

  it('Should be able to visit the page and view the title', () => {
    cy.get('h1').contains('Burrito Builder');
  });

  it('Should be able to visit the page and view an order form', () => {
    cy.get('form').children('input').should('have.length', '1');
    cy.get('form').children('button').should('have.length', '13');
  });

  it('Should be able to visit the page and view the names of past orders', () => {
    cy.get('section').children('.order').should('have.length', '3');
    cy.get('.order h3').eq(0).contains('Worm');
    cy.get('.order h3').eq(1).contains('Fish');
    cy.get('.order h3').eq(2).contains('Doggy');
  });

  it('Should be able to visit the page and view the ingredients of past orders', () => {
    cy.get('.order ul').eq(0).contains('beans');
    cy.get('.order ul').eq(0).contains('lettuce');
    cy.get('.order ul').eq(0).contains('carnitas');
    cy.get('.order ul').eq(0).contains('queso fresco');
    cy.get('.order ul').eq(0).contains('jalapeno');
  });

  it('Should be able to visit the page and view the ingredients of a different past order', () => {
    cy.get('.order ul').eq(2).contains('lettuce');
    cy.get('.order ul').eq(2).contains('guacamole');
    cy.get('.order ul').eq(2).contains('queso fresco');
  });
})

describe.only('Burrito Builder Form', () => {

  beforeEach(() => {

    cy.intercept({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/orders'
    },
      {
        statusCode: 201,
        body: {
          orders: [
            { id: 1, name: 'Worm', ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno'] },
            { id: 2, name: 'Fish', ingredients: ['beans', 'hot sauce', 'steak', 'sour cream'] },
            { id: 3, name: 'Doggy', ingredients: ['lettuce', 'guacamole', 'queso fresco'] }
          ]
        }
      });
    cy.visit('http://localhost:3000');
  });

  it('Should be able to visit the page and view an order form', () => {
    cy.get('form').children('input').should('have.length', '1');
    cy.get('form').children('button').should('have.length', '13');
  });


})
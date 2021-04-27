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

describe('Burrito Builder Form', () => {

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

  it('Should let the user know if no ingredients have been selected', () => {
    cy.get('form').children('p').contains('Nothing selected');
  });

  it('should be able to select the name input and fill it with the corresponding value', () => {
    cy.get('input[name="name"]')
      .type('Alex')
      .should('have.value', 'Alex')
  });

  it('should be able to select an ingredient option and order status should change', () => {
    cy.get('form').children('p').contains('Nothing selected');
    cy.get('input[name="name"]').type('Alex')
    cy.get('form button').eq(0).click()
    cy.get('form').children('p').contains('beans');
  });

  it('should be able to select more than one ingredient options and order status should change', () => {
    cy.get('form').children('p').contains('Nothing selected');
    cy.get('input[name="name"]').type('Alex')
    cy.get('form button').eq(0).click()
    cy.get('form button').eq(2).click()
    cy.get('form button').eq(3).click()
    cy.get('form').children('p').contains('beans, carnitas, sofritas');
  });

  it('should be able to submit order after inputing a name and at least one ingredient and view new order on page', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/reservations'
    },
      {
        statusCode: 201,
        body:
          { 'id': 99, 'name': 'Alex', ingredients: ['beans'] }
      });

    cy.get('section').children('.order').should('have.length', '3');
    cy.get('form').children('p').contains('Nothing selected');
    cy.get('input[name="name"]').type('Alex')
    cy.get('form button').eq(0).click()
    cy.get('form').children('p').contains('beans');
    cy.get('.submit-btn').click();
    cy.get('section').children('.order').should('have.length', '4');
  });

  it('should not be able to submit order if user doesn\'t enter a name', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/reservations'
    },
      {
        statusCode: 201,
        body:
          { 'id': 9, 'name': 'Alex', ingredients: [''] }
      });

    cy.get('section').children('.order').should('have.length', '3');
    cy.get('form').children('p').contains('Nothing selected');
    cy.get('form button').eq(0).click()
    cy.get('form').children('p').contains('beans');
    cy.get('.submit-btn').click();
    cy.get('form').children('p').contains('Nothing selected');
    cy.get('section').children('.order').should('have.length', '3');
  });

  it('should not be able to submit order if user doesn\'t click any ingredients', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/reservations'
    },
      {
        statusCode: 201,
        body:
          { 'id': 4, 'name': '', ingredients: ['beans'] }
      });

    cy.get('section').children('.order').should('have.length', '3');
    cy.get('form').children('p').contains('Nothing selected');
    cy.get('input[name="name"]').type('Alex');
    cy.get('.submit-btn').click();
    cy.get('form').children('p').contains('Nothing selected');
    cy.get('section').children('.order').should('have.length', '3');
    cy.get('input[name="name"]').should('have.value', '')
  });

  it('should not be able to submit order if nothing is inputted', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/reservations'
    },
      {
        statusCode: 201,
        body:
          { 'id': 4, 'name': '', ingredients: ['beans'] }
      });

    cy.get('section').children('.order').should('have.length', '3');
    cy.get('form').children('p').contains('Nothing selected');
    cy.get('.submit-btn').click();
    cy.get('form').children('p').contains('Nothing selected');
    cy.get('section').children('.order').should('have.length', '3');
    cy.get('input[name="name"]').should('have.value', '')
  });
})

describe('Burrito Builder Server Error', () => {

  beforeEach(() => {

    cy.intercept({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/orders'
    },
      {
        statusCode: 500

      });
    cy.visit('http://localhost:3000');
  });

  it('Should display an error if the server is down', () => {
    cy.get('h2').contains('Oops, something went wrong');
  });
});

describe('Burrito Builder Client Error', () => {

  beforeEach(() => {

    cy.intercept({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/orders'
    },
      {
        statusCode: 404

      });
    cy.visit('http://localhost:3000');
  });

  it('Should display an error if there is a bad request', () => {
    cy.get('h2').contains('Oops, something went wrong');
  });
});
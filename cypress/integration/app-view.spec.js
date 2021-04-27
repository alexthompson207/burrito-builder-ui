describe('Burrito Builder Homepage', () => {

  beforeEach(() => {

    crypto.intercept({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/orders'
    },
      {
        statusCode: 201,
        body: [
          { id: 1, name: 'Worm', ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno'] },
          { id: 2, name: 'Fish', ingredients: ['beans', 'hot sauce', 'steak', 'sour cream'] },
          { id: 3, name: 'Doggy', ingredients: ['lettuce', 'guacamole', 'queso fresco'] }
        ]
      });
    cy.visit('http://localhost:3000');
  })
})
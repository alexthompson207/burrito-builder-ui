describe('Burrito Builder Homepage', () => {

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
})
import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value })
  }

  handleIngredientChange = (e, newIngredient) => {
    e.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, newIngredient] })
  }


  handleSubmit = e => {
    e.preventDefault();
    this.clearInputs();
    if (this.state.name && this.state.ingredients.length) {
      const newOrder = {
        name: this.state.name,
        ingredients: this.state.ingredients
      }
    }
  }

  clearInputs = () => {
    this.setState({ name: '', ingredients: [] });
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e, ingredient)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons}

        <p>Order: {this.state.ingredients.join(', ') || 'Nothing selected'}</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;

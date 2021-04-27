import React, { Component } from 'react';
import './App.css';
import { getOrders, addOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      error: ''
    }
  }

  componentDidMount() {
    getOrders()
      .then(data => this.setState({ orders: data.orders, error: '' }))
      .catch(err => this.setState({ error: 'Oops, something went wrong' }))
  }

  addToOrders = (newOrder) => {
    addOrder(newOrder)
      .then(data => {
        if (data.id) {
          this.setState({ orders: [...this.state.orders, data] })
        } else {
          this.setState({ error: 'Please enter a name and at least one ingredient' })
        }
      })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addToOrders} />
        </header>
        {this.state.error && <h2>{this.state.error}</h2>}
        <Orders orders={this.state.orders} />
      </main>
    );
  }
}


export default App;

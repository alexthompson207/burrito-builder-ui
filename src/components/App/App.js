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
    addOrder()
      .then(data => console.log(data))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addToOrders} />
        </header>

        <Orders orders={this.state.orders} />
      </main>
    );
  }
}


export default App;

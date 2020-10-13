import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = Object.entries(res.data)
          .map(([key, value]) => ({ id: key, ...value }));
        console.log(fetchedOrders);
        this.setState({ orders: fetchedOrders, loading: false })
      })
      .catch(err => this.setState({ loading: false }));
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order =>
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price} />
        )}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
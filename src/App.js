import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { checkAuthState } from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }

  render() {
    // const routes = this.props.isAuthenticated ? (
    //   <Switch>
    //     <Route path="/checkout" component={Checkout} />
    //     <Route path="/orders" component={Orders} />
    //     <Route path="/logout" component={Logout} />
    //     <Route path="/" exact component={BurgerBuilder} />
    //   </Switch>
    // ) : (
    //   <Switch>
    //     <Route path="/auth" component={Auth} />
    //     <Route path="/" exact component={BurgerBuilder} />
    //   </Switch>
    // );

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
  onCheckAuthState: () => dispatch(checkAuthState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

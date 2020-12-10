import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/index';
import { updateObject } from '../../../utils';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
          length: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your e-mail',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        valid: true,
      },
    },
    isFormValid: false,
  };

  componentDidMount() {
    console.log(this.props);
  }

  orderHandler = e => {
    e.preventDefault();

    const orderData = Object.entries(this.state.orderForm).reduce(
      (acc, [inputId, value]) => ({ ...acc, [inputId]: value.value }),
      {}
    );

    const order = {
      ingredients: this.props.ingredients,
      orderData,
      price: this.props.totalPrice,
      userId: this.props.userId,
    };

    this.props.onBurgerOrder(order, this.props.token);
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.length) {
      isValid = value.length === rules.length && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedInput = updateObject(this.state.orderForm[inputIdentifier], {
      value: event.target.value,
      valid: this.checkValidity(
        event.target.value,
        this.state.orderForm[inputIdentifier].validation
      ),
      touched: true,
    });

    
    const updatedForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedInput,
    });

    updatedForm[inputIdentifier] = updatedInput;

    const isFormValid = Object.entries(updatedForm)
      .map(([_, value]) => value.valid)
      .every(validity => validity === true);

    this.setState({ orderForm: updatedForm, isFormValid: isFormValid });
  };

  render() {
    const formElements = Object.entries(this.state.orderForm).map(
      ([key, value]) => {
        return (
          <Input
            key={key}
            elementType={value.elementType}
            elementConfig={value.elementConfig}
            value={value.value}
            invalid={!value.valid}
            touched={value.touched}
            shouldValidate={value.validation}
            changed={event => this.inputChangedHandler(event, key)}
          />
        );
      }
    );

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements}
        {/* <Input inputtype="input" type="text" name="name" placeholder="Your name" />
        <Input inputtype="input" type="email" name="email" placeholder="Your email" />
        <Input inputtype="input" type="text" name="street" placeholder="Your street" />
        <Input inputtype="input" type="name" name="postal" placeholder="Your postal code" /> */}
        <Button btnType="Success" disabled={!this.state.isFormValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) form = <Spinner />;

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onBurgerOrder: (orderData, token) =>
    dispatch(purchaseBurger(orderData, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));

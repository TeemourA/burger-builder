import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

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
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ],
        },
        value: '',
      },
    },
    loading: false,
  }

  componentDidMount() {
    console.log(this.props);
  }


  orderHandler = (e) => {
    this.setState({ loading: true });

    const orderData = Object.entries(this.state.orderForm)
      .reduce((acc, [inputId, value]) => ({ ...acc, [inputId]: value.value }),
      {});

    const order = {
      ingredients: this.props.ingredients,
      data: orderData,
      price: this.props.price,
    };

    axios.post('/orders.json', order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => this.setState({ loading: false }));

    e.preventDefault();
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.length) {
      isValid = value.length === rules.length && isValid;
    }

    return isValid;
  }
  

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = { ...this.state.orderForm };
    const updatedInput = { ...updatedForm[inputIdentifier] };

    updatedInput.value = event.target.value;
    updatedInput.valid = this.checkValidity(updatedInput.value, updatedInput.validation);
    updatedForm[inputIdentifier] = updatedInput;
    console.log(updatedInput.valid);
    this.setState({ orderForm: updatedForm });
  }

  render() {
    const formElements = Object.entries(this.state.orderForm)
      .map(([key, value]) => {
        return (
          <Input
            key={key}
            elementType={value.elementType}
            elementConfig={value.elementConfig}
            value={value.value}
            changed={(event) => this.inputChangedHandler(event, key)} />
        );
      });

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements}
        {/* <Input inputtype="input" type="text" name="name" placeholder="Your name" />
        <Input inputtype="input" type="email" name="email" placeholder="Your email" />
        <Input inputtype="input" type="text" name="street" placeholder="Your street" />
        <Input inputtype="input" type="name" name="postal" placeholder="Your postal code" /> */}
        <Button btnType="Success">ORDER</Button>
      </form>
    );

    if (this.state.loading) form = <Spinner />

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
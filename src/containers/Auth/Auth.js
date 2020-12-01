import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { auth } from '../../store/actions/index';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength  && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };

    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
  }

  render() {
    const formElements = Object.entries(this.state.controls).map(
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

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {formElements}
          <Button btnType="Success">Submit</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password) => dispatch(auth(email, password)),
});

export default connect(null, mapDispatchToProps)(Auth);

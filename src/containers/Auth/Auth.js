import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
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
    isSignup: true,
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
      isValid = value.length >= rules.minLength && isValid;
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

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => ({ isSignup: !prevState.isSignup }));
  };

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

    let authResultMessage = null;

    if (this.props.error && !this.props.success) {
      authResultMessage = (
        <p style={{ fontWeight: 'bold', color: 'red' }}>
          {this.props.error.message}
        </p>
      );
    }

    if (!this.props.error && this.props.success) {
      authResultMessage = (
        <p style={{ fontWeight: 'bold', color: 'green' }}>SUCCESS</p>
      );
    }

    const form = (
      <div className={classes.Auth}>
        {authResultMessage}
        <h3>{this.state.isSignup ? 'Sign Up' : 'Sign In'}</h3>
        <form onSubmit={this.submitHandler}>
          {formElements}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          Switch to {this.state.isSignup ? 'Sign In' : 'Sign Up'}
        </Button>
      </div>
    );

    const authComponent = this.props.loading ? <Spinner /> : form;

    return authComponent;
  }
}

const mapPropsToState = state => ({
  loading: state.auth.loading,
  success: state.auth.success,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) =>
    dispatch(auth(email, password, isSignup)),
});

export default connect(mapPropsToState, mapDispatchToProps)(Auth);

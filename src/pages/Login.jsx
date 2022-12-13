import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    name: '',
    buttonDisabled: true,
    loading: false,
    redirect: false,
  };

  validationFields = () => {
    const { name } = this.state;
    const three = 3;
    const validationName = name.length >= three;

    this.setState({
      buttonDisabled: !(validationName),
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }), this.validationFields);
  };

  buttonClickLogin = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name });
      this.setState({
        redirect: true,
      });
    });
  };

  render() {
    const { buttonDisabled, loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        <h3>Login</h3>
        {
          loading ? <Loading /> : (
            <div>
              <input
                type="text"
                data-testid="login-name-input"
                name="name"
                placeholder="Nome"
                id="name"
                onChange={ this.handleChange }
              />

              <button
                data-testid="login-submit-button"
                type="submit"
                disabled={ buttonDisabled }
                onClick={ this.buttonClickLogin }
              >
                Entrar
              </button>
            </div>
          )
        }
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;

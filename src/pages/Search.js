import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    search: '',
    buttonDisabled: true,

  };

  validationFields = () => {
    const { search } = this.state;
    const TWO = 2;
    const validationSearch = search.length >= TWO;

    this.setState({
      buttonDisabled: !(validationSearch),
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }), this.validationFields);
  };

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <h3>Pesquise seu artista</h3>
        <Header />

        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            name="search"
            placeholder="Pesquisar artista"
            id="search"
            onChange={ this.handleChange }
          />

          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ buttonDisabled }
            // onClick={ this.buttonClickLogin }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;

import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <h3>Estou em Search</h3>
        <Header />
      </div>
    );
  }
}

export default Search;

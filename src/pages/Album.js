import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <h3>Estou em Album</h3>
        <Header />
      </div>
    );
  }
}

export default Album;

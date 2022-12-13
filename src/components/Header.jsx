import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
    loading: true,
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const user = await getUser();
      this.setState({
        userName: user.name,
        loading: false,
      });
    });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <div>
        <header
          data-testid="header-component"
        >
          {
            loading ? <Loading /> : <h3 data-testid="header-user-name">{userName}</h3>
          }
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">Search</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </li>
          </ul>
        </header>

      </div>
    );
  }
}

export default Header;

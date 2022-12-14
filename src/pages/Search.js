import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    search: '',
    buttonDisabled: true,
    isLoaging: false,
    artistAlbum: [],
    inputValue: '',
    searchArtist: '',
    foundAlbum: true,
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

  buttonClickSearch = async () => {
    const { search } = this.state;
    this.setState(
      {
        isLoaging: true,
        search: '',
      },
      async () => {
        const artist = await searchAlbumsAPI(search);
        this.setState({
          isLoaging: false,
          buttonDisabled: true,
          artistAlbum: [...artist],
          searchArtist: search,
        }, () => {
          if (artist.length === 0) {
            this.setState({ foundAlbum: false });
          }
        });
      },
    );
  };

  render() {
    const { buttonDisabled, artistAlbum, isLoaging, search, searchArtist,
      foundAlbum } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h3>Pesquise seu artista</h3>

        <div>
          <label htmlFor="search">

            <input
              type="text"
              data-testid="search-artist-input"
              name="search"
              placeholder="Pesquisar artista"
              id="search"
              value={ search }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ buttonDisabled }
            onClick={ this.buttonClickSearch }
          >
            Pesquisar
          </button>
        </div>
        <div>
          <p>{`Resultado de álbuns de: ${searchArtist}`}</p>
        </div>
        <div>
          {
            isLoaging ? <Loading /> : (
              artistAlbum
                .map(({ collectionName, collectionId, artworkUrl100, artistName }) => (
                  <div key={ collectionId }>
                    <img src={ artworkUrl100 } alt={ artistName } />
                    <div>

                      <p>
                        { collectionName }
                      </p>
                      <p key={ artworkUrl100 }>{artistName}</p>
                    </div>
                    <Link
                      to={ `/album/${collectionId}` }
                      data-testid={ `link-to-album-${collectionId}` }
                    >
                      Ir para álbum
                    </Link>

                  </div>

                ))
            )
          }
        </div>
        {foundAlbum ? null : <p>Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}

export default Search;

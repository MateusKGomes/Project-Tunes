import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    isLoadgin: false,
    hasFavorite: false,
  };

  //   onInputChange = ({ target: { name, type, value, checked } }) => {
  //     const verifyType = type === 'checkbox' ? checked : value;
  //     this.setState((prevState) => ({
  //       ...prevState,
  //       [name]: verifyType,
  //     }));
  //   };

  submitFavoriteSong = ({ target: { checked } }) => {
    this.setState({
      isLoadgin: true,
    }, async () => {
      const { music } = this.props;

      if (checked) {
        await addSong(music);
        this.setState({
          hasFavorite: true,
        });
      } else {
        this.setState({
          hasFavorite: false,
        });
      }
      this.setState({
        isLoadgin: false,
      });
    });
  };

  render() {
    const { isLoadgin, hasFavorite } = this.state;
    const { music } = this.props;
    return (
      <div>
        <span>{ music.trackName}</span>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        {
          isLoadgin ? (<Loading />)
            : (
              <div>
                <label
                  htmlFor={ music.trackId }
                  data-testid={ `checkbox-music-${music.trackId}` }
                >
                  Favorita
                  <input
                    type="checkbox"
                    name="favorite"
                    id={ music.trackId }
                    onChange={ this.submitFavoriteSong }
                    checked={ hasFavorite }
                  />
                </label>
              </div>
            )
        }
      </div>
    );
  }
}
MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};
export default MusicCard;

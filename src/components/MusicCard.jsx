import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    isLoadgin: true,
    favorites: [],
  };

  componentDidMount() {
    this.favoriteSongs();
  }

  submitFavoriteSong = ({ target: { checked } }) => {
    this.setState({
      isLoadgin: true,
    }, async () => {
      const { music } = this.props;

      if (checked) {
        await addSong(music);
        await this.favoriteSongs();
      } else {
        await removeSong(music);
        await this.favoriteSongs();
      }
    });
  };

  favoriteSongs = async () => {
    const saves = await getFavoriteSongs();
    this.setState({
      isLoadgin: false,
      favorites: saves,
    });
  };

  render() {
    const { isLoadgin, favorites } = this.state;
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
                    checked={ favorites
                      .some((favorite) => favorite.trackId === music.trackId) }
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

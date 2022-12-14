import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    songs: [],
    albumData: {},
  };

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = async () => {
    const { match: {
      params: { id },
    },
    } = this.props;
    const music = await getMusics(id);
    const albumData = music[0];
    this.setState({
      songs: music.filter((song) => song.kind === 'song'),
      albumData,
    });
  };

  render() {
    const { songs, albumData } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3>Olá</h3>
        <p data-testid="artist-name">
          {`Nome da banda: ${albumData.artistName}`}
          {' '}
        </p>
        <p data-testid="album-name">
          {' '}
          {`Nome do Álbum: ${albumData.collectionName}`}
          {' '}
        </p>
        <div>
          {
            songs.map((song) => (
              <MusicCard key={ song.trackId } music={ song } />
            ))
          }

        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;

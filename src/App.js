/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './components/Button/Button';
import AlbumCover from './components/AlbumCover/AlbumCover';

const apiToken =
  'BQCVA_PB8Mty4iQotUkHDIROjpcgwln1hMWjj5iS-2c1kdmAki3iuUmG68kPC4wkseuzAan6plzW-r718YnBjeD_f9kuRtNZ4fImehK6hxSsYYnBmFHig4jc7W_qrZA8yRnWZ5D5hxZvUJNyGyY7JUHzs_zMPq6TSyIfItw-YIuAwy-_papFFYEZX1DmILciIh5dhZ_vr3bvOEC8N-6iYmvJzBkZB0lTeFvthWVG9RZRZKnJ8XYg2IJmmSiKCym__tBYa_RkKHYE_IonNTVCEA';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      areTracksLoaded: false,
      tracks: [],
      currentTrack: null,
      expireTimeout: null
    };
  }

  componentDidMount() {
    const expireTimeout = setTimeout(() => this.changeTrack(), 30000);
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          areTracksLoaded: true,
          tracks: data.items,
          currentTrack: data.items[getRandomNumber(data.items.length)].track,
          expireTimeout
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentTrack &&
      this.state.currentTrack &&
      prevState.currentTrack.id !== this.state.currentTrack.id
    ) {
      const expireTimeout = setTimeout(() => this.changeTrack(), 30000);
      this.setState({
        expireTimeout
      });
    }
  }

  checkAnswer(trackId) {
    if (trackId === this.state.currentTrack.id) {
      swal("Bravo, c'est la bonne réponse", 'On continue ?', 'success').then(
        () => {
          this.changeTrack();
          clearTimeout(this.state.expireTimeout);
        }
      );
    } else {
      swal('Oops, mauvaise réponse', 'Try again', 'error');
    }
  }

  changeTrack() {
    const { tracks } = this.state;
    this.setState({
      currentTrack: tracks[getRandomNumber(tracks.length)].track
    });
  }

  render() {
    const { currentTrack, areTracksLoaded, tracks } = this.state;

    if (areTracksLoaded) {
      const secondTrack = tracks[getRandomNumber(tracks.length)].track;
      const thirdTrack = tracks[getRandomNumber(tracks.length)].track;
      const blindtestTracks = shuffleArray([
        currentTrack,
        secondTrack,
        thirdTrack
      ]);

      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Wow Crazy Blindtest</h1>
          </header>
          <div className="App-images">
            <AlbumCover track={currentTrack} />
            <Sound
              url={currentTrack.preview_url}
              playStatus={Sound.status.PLAYING}
            />
            <div className="App-buttons">
              {blindtestTracks.map((track, index) => (
                <Button
                  key={`${track.id}-${index}`}
                  onClick={() => this.checkAnswer(track.id)}
                >
                  {track.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="App-buttons"></div>
        </div>
      );
    } else {
      return <img src={loading} className="loading" alt="loading" />;
    }
  }
}

export default App;

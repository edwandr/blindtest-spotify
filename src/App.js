/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './components/Button/Button';
import AlbumCover from './components/AlbumCover/AlbumCover';

const apiToken =
  'BQBpJn3LKSwUhtgoPjihL1FJMQkIgg2GextoHJQUMp5omtD5dTo7PT994gn0O42_oUlzU-u-CMCKIwkpCsT7Q8ZOhPhQJJ_V8tbe15yRFTn7jciTodv-lDNFrgu11FnjOfbqx6dM4w69NGpwOXRfYK--21ndh-Fp7z5saNmL6vJEI-IHXvFGROc9SoUq8WUm39e5hUl582QxBdR_Cq4vQ5ayVhU81hDNryvdpzKLctIxp_NwnFj8Kq1aHqFwTQSUw_YItHrl6Z-KdVu37NljBA';

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
      currentTrack: null
    };
  }

  componentDidMount() {
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
          currentTrack: data.items[0].track
        });
      });
  }

  checkAnswer(trackId) {
    if (trackId === this.state.currentTrack.id) {
      swal("Bravo, c'est la bonne réponse", 'On continue ?', 'success');
    } else {
      swal('Oops, mauvaise réponse', 'Try again', 'error');
    }
  }

  render() {
    const { currentTrack, areTracksLoaded } = this.state;

    if (areTracksLoaded) {
      const secondTrack = this.state.tracks[1].track;
      const thirdTrack = this.state.tracks[2].track;

      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Bienvenue sur le Blindtest</h1>
          </header>
          <div className="App-images">
            <AlbumCover track={currentTrack} />
            <Sound
              url={currentTrack.preview_url}
              playStatus={Sound.status.PLAYING}
            />
            <div className="App-buttons">
              <Button onClick={() => this.checkAnswer(currentTrack.id)}>
                {currentTrack.name}
              </Button>
              <Button onClick={() => this.checkAnswer(secondTrack.id)}>
                {secondTrack.name}
              </Button>
              <Button onClick={() => this.checkAnswer(thirdTrack.id)}>
                {thirdTrack.name}
              </Button>
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

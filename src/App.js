/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

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
      tracks: []
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
        console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
        this.setState({
          areTracksLoaded: true,
          tracks: data.items
        });
      });
  }

  render() {
    if (this.state.areTracksLoaded) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Bienvenue sur le Blindtest</h1>
          </header>
          <div className="App-images">
            <p>Nombre de morceaux reçus : {this.state.tracks.length}</p>
            <p>
              Titre de la première chanson :{' '}
              {this.state.tracks.length > 0 && this.state.tracks[0].track.name}
            </p>
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

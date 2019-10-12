import React from 'react';
import './AlbumCover.css';

const AlbumCover = ({ track }) => {
  const trackCover = track.album.images[0].url;

  return <img src={trackCover} alt="track-cover" className="album-cover" />;
};

export default AlbumCover;

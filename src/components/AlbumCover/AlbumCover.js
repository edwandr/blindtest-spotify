import React from 'react';

const AlbumCover = ({ track }) => {
  const trackCover = track.album.images[0].url;

  return <img src={trackCover} alt="track-cover" />;
};

export default AlbumCover;

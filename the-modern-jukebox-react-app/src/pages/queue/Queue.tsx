import React from 'react';
import { clearQueue } from '../../services/SpotifyPostService';
import { getQueue } from '../../services/SpotifyPostService';

function Queue() {
  const handleClearQueue = () => {
    clearQueue();
  };

  const handleGetQueue = () => {
    console.log("Returned From Queue", getQueue());
  }

  return (
    <div>
      <button onClick={handleClearQueue}>Clear Queue</button>
      <button onClick={handleGetQueue}>Get Queue</button>
    </div>
  );
}

export default Queue;

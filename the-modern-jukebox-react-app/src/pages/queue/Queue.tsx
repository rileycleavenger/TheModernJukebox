import React from 'react';
import { clearQueue } from '../../services/SpotifyPostService';

function Queue() {
  const handleClearQueue = () => {
    clearQueue();
  };

  return (
    <div>
      <h1>This is the queue page!</h1>
      <button onClick={handleClearQueue}>Clear Queue</button>
    </div>
  );
}

export default Queue;

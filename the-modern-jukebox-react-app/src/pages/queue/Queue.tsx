import React, { useState } from 'react';
import { clearQueue } from '../../services/SpotifyPostService';
import { getQueue } from '../../services/SpotifyPostService';
import { SpotifyObjectForHardware } from '../../types';

function Queue() {
  const [queue, setQueue] = useState<SpotifyObjectForHardware[]>([]);

  const handleClearQueue = () => {
    clearQueue();
    setQueue([]); // Update the state variable using setQueue
  };

  const handleGetQueue = async () => {
    const queueData = await getQueue(); // Await the getQueue function
    console.log("Returned From Queue", queueData);
    setQueue(queueData); // Update the state variable using setQueue
  };

  return (
    <div>
      <button onClick={handleClearQueue}>Clear Queue</button>
      <button onClick={handleGetQueue}>Get Queue</button>
      <table>
        <thead>
          <tr>
            <th>User Token</th>
            <th>Uri</th>
          </tr>
        </thead>
        <tbody>
          {queue.map((item) => (
            <tr>
              <td>{item.userAccessToken}</td>
              <td>{item.uri}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Queue;

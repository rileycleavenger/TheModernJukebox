import React, { useState } from 'react';
import { clearQueue } from '../../services/SpotifyPostService';
import { getQueue } from '../../services/SpotifyPostService';
import { SpotifyObjectForHardware, QueueObject } from '../../types';
import { getTrackFromUri } from '../../hooks/spotify';

function Queue() {

  let psuedoQueue: QueueObject[] = [];

  const [queue, setQueue] = useState<SpotifyObjectForHardware[]>([]);

  const handleClearQueue = () => {
    clearQueue();
    setQueue([]); // Update the state variable using setQueue
  };

  const handleGetQueue = async () => {
    const queueData = await getQueue(); // Await the getQueue function
    console.log("Returned From Queue", queueData);
    setQueue(queueData); // Update the state variable using setQueue

    // loop through the queue and create the psuedoQueue with each item by using getTrackFromUri
    queueData.forEach(async (item) => {
      const trackData = await getTrackFromUri(item.uri);
      if (trackData) {
        psuedoQueue.push({
          userAccessToken: item.userAccessToken,
          uri: item.uri,
          trackName: trackData.trackName,
          trackArtist: trackData.trackArtist,
          trackCover: trackData.trackCover,
        });
      }
    });
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
            <th>Name</th>
            <th>Artist</th>
            <th>Cover</th>
          </tr>
        </thead>
        <tbody>
          {psuedoQueue.map((item) => (
            <tr>
              <td>{item.userAccessToken}</td>
              <td>{item.uri}</td>
              <td>{item.trackName}</td>
              <td>{item.trackArtist}</td>
              <td>
                <img src={item.trackCover} alt="Cover" />
              </td>
            </tr>
          ))}
        </tbody> 
      </table>
    </div>
  );
}

export default Queue;

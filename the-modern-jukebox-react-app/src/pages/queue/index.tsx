import React, { useState } from 'react';
import { clearQueue } from '../../services/SpotifyPostService';
import { getQueue } from '../../services/SpotifyPostService';
import { QueueObject } from '../../types';
import './index.css';
import useMediaQuery from '../../hooks/useMediaQuery';
import { SelectedPage } from '../../assets/variables/availablepages';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import locked from "../../assets/images/locked.png";
type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};
let token = (sessionStorage.getItem("token")|| "")
const Queue = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  let psuedoQueue: QueueObject[] = [];

  const [queue, setQueue] = useState<QueueObject[]>([]);

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
    <section id="queue" className="gap-16 bg-primary-100 py-10 md:h-full md:pb-0">
      {/* IMAGE AND MAIN HEADER */}
      <motion.div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
        onViewportEnter={() => setSelectedPage(SelectedPage.Queue)}
      >

    <div>
      {!token &&
        <div>
         <div>
          <p className="text-lg mt-24">
            The Queue page allows you to view your queued songs and clear the list.
            To gain access to this page, please sign with Spotify.
          </p>
         </div>
         <div
          className="flex basis-full justify-center z-10
              mt-32 justify-items-end"
          >
          <img alt="locked" src={locked} />
         </div>
        </div>
      }
      {token &&
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
            {queue.map((item) => (
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
      }
    </div>
    </motion.div>
    </section>
  );
}

export default Queue;

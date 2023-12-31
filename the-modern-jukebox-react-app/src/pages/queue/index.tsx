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

const Queue = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  let token = (sessionStorage.getItem("token")|| "")
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
        <div className="flex items-center justify-stretch gap-6">
        <button
        className="rounded-md bg-primary-500 px-10 py-2 hover:bg-primary-700"
        onClick={handleClearQueue}>Clear Queue</button>
        <button
        className="rounded-md bg-primary-500 px-10 py-2 hover:bg-primary-700"
        onClick={handleGetQueue}>Get Queue</button>
        </div>
        <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Artist</th>
              <th>Duration</th>
              <th>Cover</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((item) => (
              <tr>
                <td>{item.trackName}</td>
                <td>{item.trackArtist}</td>
                <td>{item.duration}</td>
                <td>
                  <img src={item.trackCover} alt="Cover" />
                </td>
              </tr>
            ))}
          </tbody> 
        </table>
        </div>
      </div>
      }
    </div>
    </motion.div>
    </section>
  );
}

export default Queue;

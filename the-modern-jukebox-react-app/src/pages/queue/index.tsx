import React, { useEffect, useState } from 'react';
import { clearQueue } from '../../services/QueuePostService';
import { getQueue } from '../../services/QueuePostService';
import { QueueObject } from '../../types';
import './index.css';
import useMediaQuery from '../../hooks/useMediaQuery';
import locked from "../../assets/images/locked.png";

function Queue () {
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

  useEffect(() => {
    handleGetQueue();
  }, []);

  // functions for navigating the queue
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const handlePreviousItem = () => {
    setCurrentItemIndex((prevIndex) => prevIndex - 3);
  };
  const handleNextItem = () => {
    setCurrentItemIndex((prevIndex) => prevIndex + 3);
  };

  return (
    <section id="queue" className="gap-16 bg-primary-100 py-10 md:h-full md:pb-0"
    >
      <div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
      >

    <div>
      {!token &&
        <div className='px-40'>
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
      <div className='py-16'> 
        <div 
        className="flex items-center justify-stretch gap-6"
        >
        <button
        className="rounded-md bg-primary-500 px-10 py-2 hover:bg-primary-700"
        onClick={handleClearQueue}>Clear Queue</button>
        <button
        className="rounded-md bg-primary-500 px-10 py-2 hover:bg-primary-700"
        onClick={handleGetQueue}>Refresh Queue</button>
        </div>
        <div className="queueContainer">
          <div className="itemContainer">
            {queue.slice(currentItemIndex, currentItemIndex + 3).map((item, index) => (
              <div key={index} className="item">
                <img className="coverart" src={item.trackCover} alt="Cover" />
                <div><strong>{item.trackName}</strong></div>
                <div>{item.trackArtist}</div>
              </div>
            ))}
          </div>
          <div className="arrowButtons">
            <button onClick={handlePreviousItem} disabled={currentItemIndex === 0}>
              Previous
            </button>
            <button
              onClick={handleNextItem}
              disabled={currentItemIndex >= queue.length - 3}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      }
    </div>
    </div>
    </section>
  );
}

export default Queue;

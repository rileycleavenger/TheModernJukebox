import React, { useEffect, useState, useRef } from 'react';
import { clearQueue, getQueue, removeSong } from '../../services/QueuePostService';
import { QueueObject } from '../../types';
import './index.css';
import useMediaQuery from '../../hooks/useMediaQuery';
import locked from "../../assets/images/locked.png";
import { FaTrash, FaSync, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { addToPlaying } from '../../services/PlayingPostService';

function Queue () {
  const isAboveMediumScreens = useMediaQuery("(min-width:768px)");
  let token = (sessionStorage.getItem("token")|| "")
  let sessionID = (sessionStorage.getItem("code")|| "")
  let psuedoQueue: QueueObject[] = [];

  const [queue, setQueue] = useState<QueueObject[]>([]);

  const handleClearQueue = () => {
    clearQueue(sessionID);
    setQueue([]); // Update the state variable using setQueue
  };

  const handleGetQueue = async () => {
    const queueData = await getQueue(sessionID); // Await the getQueue function
    console.log("Returned From Queue", queueData);
    setQueue(queueData); // Update the state variable using setQueue
  };

  const handleRemoveSong = async (item: QueueObject) => {
    await removeSong(item, sessionID); // Call removeSong function with the item
    handleGetQueue(); // Call handleGetQueue to update the queue
  };

  const queueRef = useRef(queue);
  queueRef.current = queue;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (queueRef.current.length <= 0) {
        handleGetQueue();
      }
    }, 500); // 0.5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [buttonText, setButtonText] = useState('');

  const handleMouseEnter = (text: string) => {
    setButtonText(text);
  };

  const handleMouseLeave = () => {
    setButtonText('');
  };

  return (
    <section id="queue" className="gap-16 bg-primary-100 py-10 md:h-full md:pb-0 mobileContainer"
    >
      {queue.length > 0 &&
      <div className='py-16'> 
        <div 
        className="buttonsContainer"
        >
          <button
            onClick={handleClearQueue}
            className='queueButton'
            onMouseEnter={() => handleMouseEnter('Clear the Queue')}
            onMouseLeave={handleMouseLeave}
          >
            <FaTrash className="icon-large"></FaTrash>
          </button>
          <button
            onClick={handleGetQueue}
            className='queueButton'
            onMouseEnter={() => handleMouseEnter('Update the Queue')}
            onMouseLeave={handleMouseLeave}
          >
            <FaSync className="icon-large"></FaSync>
          </button>
          <p className="queueButtonText">{buttonText}</p>
        </div>
        <div className="queueContainer">
          <div className="itemContainerWrapper">
            <div className="itemContainer">
              {queue.map((item, index) => (
                <div
                  key={index}
                  className={`item ${index === 0 ? 'firstItem' : ''}`}
                  style={{ marginLeft: index === 0 ? 0 : undefined }}
                >
                  <div className="itemWrapper">
                    <div className="coverartContainer" >
                      <FaTimes className="timesIcon" onClick={() => handleRemoveSong(item)} />
                      <img /*onClick={() => addToPlaying(item, sessionID)}*/ className="coverart" src={item.trackCover} alt="Cover" />
                    </div>
                    <div style={{ fontSize: '20px', textAlign: 'center', marginTop: '10px' }}>
                      <strong>{item.trackName}</strong>
                    </div>
                    <div style={{ textAlign: 'center' }}>{item.trackArtist}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      }
      {token && queue.length === 0 &&
        <div className='px-40 no-data'>
          <p className="text-lg mt-24">
            If you haven't queued any songs, vist the <Link to="/MusicPlayer"><strong className="text-blue-500">Search</strong></Link> page! Otherwise, please wait for the updated queue to load.
          </p>
          <div className='loader-wrapper'>
            <div className="loader"></div>
          </div>
        </div>
      }
    </section>
  );
}

export default Queue;

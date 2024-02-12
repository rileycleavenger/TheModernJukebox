import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import useMediaQuery from "../../hooks/useMediaQuery";
import { loginURL } from "../../hooks/spotify";
import { getPlaying } from "../../services/PlayingPostService";
import { QueueObject, Controls } from "../../types";
import { FaCompactDisc, FaPause, FaPlay, FaBackward, FaForward} from 'react-icons/fa';
import { addToControls } from "../../services/ControlsPostService";
import "./index.css";

function Navbar () {
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
  const navbarBackground = "bg-primary-300 drop-shadow";
  const [areControlsDisplayed, setControlsDisplayed] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<QueueObject | null>(null);
  const [buttonText, setButtonText] = useState('');
  let current: QueueObject | null = null;
  let nowPlayingTextWidth = 0.0;

  const changeControlsAnimation = () => {
    if(areControlsDisplayed) {
      
      // set controls animation
      const controls = document.querySelector('.nowPlayingControls');
      if(controls) {
        controls.setAttribute('style', 'animation:slideOut 0.9s');
      }

      // set the style of controlsIcon to animation fadeOut
      const controlsIcon = document.querySelectorAll('.controlsIcon');
      if(controlsIcon) {
        controlsIcon.forEach((icon) => {
          icon.setAttribute('style', 'animation:fadeOut 1.5s');
        });
      }

      // wait for animation to finish before setting controls to be displayed
      setTimeout(() => {
        setControlsDisplayed(false);
      }, 900);

    } else {

      // get width from nowPlayingText
      const nowPlayingText = document.querySelector('.nowPlayingText');
      if(nowPlayingText) {
        nowPlayingTextWidth = nowPlayingText.clientWidth;
        console.log('width:', nowPlayingTextWidth);
        const rightOfCover = document.querySelector('.rightOfCover');
        if(rightOfCover) {
          rightOfCover.setAttribute('style', `width:${nowPlayingTextWidth}px`);
        }
      }

      // set the style of nowPlayText to animation slideOut
      if(nowPlayingText) {
        nowPlayingText.setAttribute('style', 'animation:fadeOut 1.5s');
      }

      // wait for animation to finish before setting controls to be displayed
      setTimeout(() => {
        setControlsDisplayed(true);
      }, 900);
    }
  }

  const playSong = async () => {

    // set the style of nowPlayingAlbumArt to move
    const albumArt = document.querySelector('.nowPlayingAlbumArt');
    if(albumArt) {
      albumArt.setAttribute('style', 'animation:pop 0.9s infinite');
    }

    // new controls object where play is true
    const controls: Controls = {
      play: true,
      pause: false,
      next: false,
      previous: false,
    };
    // send the new controls object to the server
    await addToControls(controls);
  }

  const pauseSong = async () => {

    // set the style of nowPlayingAlbumArt to animation:none
    const albumArt = document.querySelector('.nowPlayingAlbumArt');
    if(albumArt) {
      albumArt.setAttribute('style', 'animation:none');
    }

    // new controls object where pause is true
    const controls: Controls = {
      play: false,
      pause: true,
      next: false,
      previous: false,
    };
    // send the new controls object to the server
    await addToControls(controls);
  }

  const nextSong = async () => {
    // new controls object where next is true
    const controls: Controls = {
      play: false,
      pause: false,
      next: true,
      previous: false,
    };
    // send the new controls object to the server
    await addToControls(controls);
  }

  const previousSong = async () => {
    // new controls object where previous is true
    const controls: Controls = {
      play: false,
      pause: false,
      next: false,
      previous: true,
    };
    // send the new controls object to the server
    await addToControls(controls);
  }

  const handleMouseEnter = (text: string) => {
    setButtonText(text);
  };

  const handleMouseLeave = () => {
    setButtonText('');
  };

  function sessionReset(){
    // clear all local storage
    window.sessionStorage.clear();

    // redirect to home page
    window.location.href = `${window.location.origin}/home`;
  }

  useEffect(() => {
    const fetchCurrentSong = async () => {
      const song = await getPlaying();

      // set width of right of cover back to 100% if new song
      const rightOfCover = document.querySelector('.rightOfCover');
      if(rightOfCover && (current?.trackName !== song.trackName)) {
        // reset to title
        setControlsDisplayed(false);

        // set the style of rightOfCover to width:100%
        rightOfCover.setAttribute('style', 'width:100%');
        console.log(current?.trackName, song.trackName, "newSong")
      }
      setCurrentSong(song);
      current = song;
    };

    // Call once immediately
    fetchCurrentSong();

    // Then set up interval to poll every 10 seconds
    const intervalId = setInterval(fetchCurrentSong, 10000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav>
      {window.sessionStorage.getItem("loginType") !== null &&
      <div>
      <div
        className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-4`}
      >
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {isAboveMediumScreens ? (
              <div className={`${flexBetween} w-full`}>
                <div className={`${flexBetween} gap-8 text-sm`}>
                <a
                className={`${"home" ? "text-primary-400 font-bold" : ""}
                transition duration-500 hover:text-gray-200 hover:transform hover:-translate-y-1
                `}
                href={`${window.location.origin}/home`}
                >
                  Home
                </a> 
                <a
                className={`${"musicplayer" ? "text-primary-400 font-bold" : ""}
                transition duration-500 hover:text-gray-200 hover:transform hover:-translate-y-1
                `}
                href={`${window.location.origin}/musicplayer`}
                >
                  Music Player
                </a> 
                <a
                className={`${"queue" ? "text-primary-400 font-bold" : ""}
                transition duration-500 hover:text-gray-200 hover:transform hover:-translate-y-1
                `}
                href={`${window.location.origin}/queue`}
                >
                  Queue
                </a> 
                <a
                  className={`${"about" ? "text-primary-400 font-bold" : ""}
                  transition duration-500 hover:text-gray-200 hover:transform hover:-translate-y-1
                  `}
                  href={`${window.location.origin}/about`}
                >
                  About
                </a> 
                </div>
                {currentSong && (
                <div className={`${flexBetween} justify-center sessionID`}>
                  <div className="sessionIDTop">
                    <div
                      onMouseEnter={() => handleMouseEnter('click to create or join a new session')}
                      onMouseLeave={handleMouseLeave}
                      style={{paddingBottom: '5px' }}
                    >
                      <FaCompactDisc
                        style={{ margin: '4px', marginRight: '8px' }}
                        className="text-primary-400 transition duration-500 hover:text-gray-200 hover:transform"
                        onClick={sessionReset}
                      />
                    </div>
                    <p>
                      <strong>Session ID: </strong> 
                      {window.sessionStorage.getItem("code")}
                    </p>
                  </div>
                  <div className="sessionIDBottom">
                    <p 
                      className="sessionIDHoverText"
                      style={{ fontSize: '12px'}}
                      onMouseEnter={() => handleMouseEnter('click to create or join a new session')}
                      onMouseLeave={handleMouseLeave}>{buttonText}</p>
                  </div>
                </div>
                )}
                {!currentSong && (
                <div className={`${flexBetween} sessionIDNoSong`}>
                  <div className="sessionIDTop">
                    <div
                      onMouseEnter={() => handleMouseEnter('click to create or join a new session')}
                      onMouseLeave={handleMouseLeave}
                      style={{paddingBottom: '5px' }}
                    >
                      <FaCompactDisc
                        style={{ margin: '4px', marginRight: '8px' }}
                        className="text-primary-400 transition duration-500 hover:text-gray-200 hover:transform"
                        onClick={sessionReset}
                      />
                    </div>
                    <p>
                      <strong>Session ID: </strong> 
                      {window.sessionStorage.getItem("code")}
                    </p>
                  </div>
                  <div className="sessionIDBottom">
                    <p 
                      className="sessionIDHoverText"
                      style={{ fontSize: '12px'}}
                      onMouseEnter={() => handleMouseEnter('click to create or join a new session')}
                      onMouseLeave={handleMouseLeave}>{buttonText}</p>
                  </div>
                </div>
                )}
                <div className={`${flexBetween} gap-8`}>
                  {currentSong &&
                  <div className="nowPlayingWrapper">
                    <img onClick={changeControlsAnimation} src={currentSong ? currentSong.trackCover : ''} alt="album art" className="nowPlayingAlbumArt" />
                    <div className="rightOfCover">
                      {!areControlsDisplayed &&
                      <div id="nowPlayingText" className="nowPlayingText">
                        <p><strong>{currentSong ? currentSong.trackName : ''}</strong></p>
                        <p>{currentSong ? currentSong.trackArtist : ''}</p>
                      </div>
                      }
                      {areControlsDisplayed &&
                      <div id="nowPlayingControls" className="nowPlayingControls">
                        <FaBackward className="controlsIcon text-primary-400 transition duration-500 hover:text-gray-200 hover:transform" onClick={previousSong} style={{margin: '4px'}}/>
                        <FaPlay className="controlsIcon transition duration-500 hover:text-gray-200 hover:transform" onClick={playSong}  style={{margin: '4px', marginRight: '0'}}/>
                        <FaPause className="controlsIcon transition duration-500 hover:text-gray-200 hover:transform" onClick={pauseSong} style={{margin: '4px', marginLeft: '1px'}}/>
                        <FaForward className="controlsIcon text-primary-400 transition duration-500 hover:text-gray-200 hover:transform" onClick={nextSong}  style={{margin: '4px'}}/>
                      </div>
                      }
                    </div>
                  </div>
                  }
                </div>
              </div>
            ) : (
              <button
                className="rounded-full bg-primary-100 p-2"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <Bars3Icon className="h-6 w-6 text-white" />
              </button>
              
            )}
            {!isAboveMediumScreens && (
            <div className={`${flexBetween} justify-center sessionID`}>
            <div className="sessionIDTop">
              <div
                style={{paddingBottom: '5px' }}
              >
                <FaCompactDisc
                  style={{ margin: '4px', marginRight: '8px' }}
                  className="text-primary-400 transition duration-500 hover:text-gray-200 hover:transform"
                  onClick={sessionReset}
                />
              </div>
              <p
              onClick={() => handleMouseEnter('tap the disc to create or join a new session')}>
                <strong>Session ID: &nbsp;</strong> 
                {window.sessionStorage.getItem("code")}
              </p>
            </div>
            <div className="sessionIDBottom">
              <p 
                className="sessionIDHoverText"
                style={{ fontSize: '10px'}}>
                  {buttonText}
              </p>
            </div>
          </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-200 drop-shadow-xl">
          <div className="flex justify-end p-12">
            <button className="rounded-full bg-primary-100 p-2" onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-gray-100" />
            </button>
          </div>
          
          <div className="ml-[33%] flex flex-col gap-10 text-2xl">
          <a
                className={`${"home" ? "text-primary-400 font-bold" : ""}
                transition duration-500 hover:text-gray-200
                `}
                href="home"
                >
                  Home
                </a> 
                <a
                className={`${"musicplayer" ? "text-primary-400 font-bold" : ""}
                transition duration-500 hover:text-gray-200
                `}
                href="musicplayer"
                >
                  Music Player
                </a> 
                <a
                className={`${"queue" ? "text-primary-400 font-bold" : ""}
                transition duration-500 hover:text-gray-200
                `}
                href="queue"
                >
                  Queue
                </a> 
                <a
                className={`${"about" ? "text-primary-400 font-bold" : ""}
                transition duration-500 hover:text-gray-200
                `}
                href="about"
                >
                  About
                </a> 
            
          </div>
          {currentSong &&
          <div className="nowPlayingWrapper">
            <img src={currentSong ? currentSong.trackCover : ''} onClick={() => setControlsDisplayed(!areControlsDisplayed)} className="nowPlayingAlbumArt" />

            {!areControlsDisplayed &&
            <div className="nowPlayingText">
              <p><strong>{currentSong ? currentSong.trackName : ''}</strong></p>
              <p>{currentSong ? currentSong.trackArtist : ''}</p>
            </div>
            }
            {areControlsDisplayed &&
            <div className="nowPlayingControls">
              <FaBackward className="controlsIcon text-primary-400 transition duration-500 hover:text-gray-200 hover:transform" onClick={previousSong} style={{margin: '4px'}}/>
              <FaPlay className="controlsIcon transition duration-500 hover:text-gray-200 hover:transform" onClick={playSong}  style={{margin: '4px', marginRight: '0'}}/>
              <FaPause className="controlsIcon transition duration-500 hover:text-gray-200 hover:transform" onClick={pauseSong} style={{margin: '4px', marginLeft: '1px'}}/>
              <FaForward className="controlsIcon text-primary-400 transition duration-500 hover:text-gray-200 hover:transform" onClick={nextSong}  style={{margin: '4px'}}/>
            </div>
            }
          </div>
          }   
        </div>
      )}
      </div>
      }
    </nav>
  );
};

export default Navbar;
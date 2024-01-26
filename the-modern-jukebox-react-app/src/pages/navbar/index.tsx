import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import useMediaQuery from "../../hooks/useMediaQuery";
import { loginURL } from "../../hooks/spotify";
import { getPlaying } from "../../services/PlayingPostService";
import { QueueObject } from "../../types";
import "./index.css";

function Navbar () {
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
  const navbarBackground = "bg-primary-300 drop-shadow";

  const [currentSong, setCurrentSong] = useState<QueueObject | null>(null);

  useEffect(() => {
    const fetchCurrentSong = async () => {
      const song = await getPlaying();
      setCurrentSong(song);
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
        className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}
      >
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {isAboveMediumScreens ? (
              <div className={`${flexBetween} w-full`}>
                <div className={`${flexBetween} gap-8 text-sm`}>
                <a
                className={`${"home" ? "text-primary-400 font-bold" : ""}
                transition duration-500 hover:text-gray-200
                `}
                href={`${window.location.origin}/home`}
                >
                  Home
                </a> 
                <a
                className={`${"musicplayer" ? "text-primary-400 font-bold" : ""}
                transition duration-500 hover:text-gray-200
                `}
                href={`${window.location.origin}/musicplayer`}
                >
                  Music Player
                </a> 
                <a
                className={`${"queue" ? "text-primary-400 font-bold" : ""}
                transition duration-500 hover:text-gray-200
                `}
                href={`${window.location.origin}/queue`}
                >
                  Queue
                </a> 
                <a
                className={`${"about" ? "text-primary-400 font-bold" : ""}
                transition duration-500 hover:text-gray-200
                `}
                href={`${window.location.origin}/about`}
                >
                  About
                </a> 
                </div>
                <div className={`${flexBetween} gap-8`}>
                  {currentSong &&
                  <div className="nowPlayingWrapper">
                    <img src={currentSong ? currentSong.trackCover : ''} alt="album art" className="nowPlayingAlbumArt" />
                    <div className="nowPlayingText">
                      <p><strong>{currentSong ? currentSong.trackName : ''}</strong></p>
                      <p>{currentSong ? currentSong.trackArtist : ''}</p>
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
            <img src={currentSong ? currentSong.trackCover : ''} className="nowPlayingAlbumArt" />
            <div className="nowPlayingText">
              <p><strong>{currentSong ? currentSong.trackName : ''}</strong></p>
              <p>{currentSong ? currentSong.trackArtist : ''}</p>
            </div>
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
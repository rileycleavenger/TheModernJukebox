import { useState, useRef, useEffect} from 'react';
import { QueueObject } from '../../types';
import { addToQueue } from '../../services/QueuePostService';
import useMediaQuery from '../../hooks/useMediaQuery';
import { motion } from "framer-motion";
import locked from "../../assets/images/locked.png";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { searchShazam } from '../../hooks/shazam';
import { searchSpotify } from '../../hooks/spotify';
import './index.css';

function MusicPlayer () {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  useEffect(() => {
    if (isAboveMediumScreens) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };}
  }, []); 
  let token = (sessionStorage.getItem("token")|| "")

  // function used to export to queue for the hardware
  function ExportToQueue(duration_ms: string, trackUri: string, tackName: string, trackArtist: string, trackCover: string) {
    // create a variable of type QueueObject that is made with the uri and the token
    const queueObject: QueueObject = {
      uri: trackUri,
      userAccessToken: token,
      duration: duration_ms,
      trackName: tackName,
      trackArtist: trackArtist,
      trackCover: trackCover,
    };
    // console.log("What is Posted:", queueObject);

    // post the variable to the hardware
    addToQueue(queueObject);
  }

  // useState setup for the Shazam search
  const [shazamSearchResults, setShazamSearchResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // function to call search
  const handleSearch = async () => {
    
    // verify there is data in the textbox
    if (inputRef.current && typeof inputRef.current !== "undefined") {

      console.log("searching for:", inputRef.current.value);
      
      // set search results var
      const results = await searchShazam(inputRef.current.value);
      setShazamSearchResults(results);
    }
  };

  // useState setup for Spotify search
  const [spotifySearchResult, setSpotifySearchResult] = useState<any>();

  // useEffect to format the track when spotifySearchResult changes
  useEffect(() => {
    if (spotifySearchResult) {
      ExportToQueue(
        spotifySearchResult.duration_ms,
        spotifySearchResult.uri,
        spotifySearchResult.name,
        spotifySearchResult.artists[0].name,
        spotifySearchResult.album.images[0].url
      );
    }
  }, [spotifySearchResult]);

  // function to call spotify search
  const FindSpotifyUriAndExport = async (trackName: string, trackArtist: string) => {
    // search for song
    const result = await searchSpotify(trackName, trackArtist);
    setSpotifySearchResult(result);
  };

  // useState setup for audio previews
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  return (
    <section id="musicplayer" className="gap-16 bg-primary-100 py-10 md:h-full md:pb-0">
    <div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
    >
    <div>
      <div>
       {!token &&
          <div className='px-40'>
          <div>
          <p className="text-lg mt-28">
            The Music Player page allows you to search for your favorite songs and queue them.
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
          <div className="mt-16 px-40">    
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-6 w-6 text-white" />
            <p className="text-lg">
              Search and queue your favorite songs
            </p> 
            <SparklesIcon className="h-6 w-6 text-white" />
          </div>  
          <div className="mt-10">  
          <form>
            <div className="flex items-center gap-8">
              <input className="rounded-md bg-gray-100 px-10 py-2 text-black" type='text' ref={inputRef} />
              <button 
                className="rounded-md bg-primary-500 px-10 py-2 hover:bg-primary-700" 
                type="submit" 
                onClick={(event) => {
                  event.preventDefault();
                  handleSearch();
                }}
              >
                Search
              </button>            
            </div>
            <div className="flex flex-col mt-8"> 
              <div className="grid gap-4 grid-cols-6">
                {shazamSearchResults.map((track: any) => (

                  <div key={track.key}>
                    <img
                      src={track.images.coverart}
                      alt={track.title}
                      onClick={() => {
                        if (isAudioPlaying && audio?.src === track.hub.actions[1].uri) {
                          audio?.pause();
                          setIsAudioPlaying(false);
                        } else {
                          if (audio) {
                            audio.pause();
                          }
                          const newAudio = new Audio(track.hub.actions[1].uri);
                          newAudio.play();
                          setAudio(newAudio);
                          setIsAudioPlaying(true);
                        }
                      }}
                      style={{
                        cursor: 'pointer',
                        animation: isAudioPlaying && audio?.src === track.hub.actions[1].uri ? 'pop 0.4s infinite alternate' : 'none',
                        margin: '20px',
                      }}
                    />

                    <p
                      style={{
                        margin: '20px'
                      }}
                    >
                      <strong>{track.title}</strong>
                      <br />
                      {track.subtitle}
                    </p>
                    {token && (
                      <button 
                        className="rounded-md bg-primary-500 px-2 py-2 hover:bg-primary-700" 
                        type="submit" 
                        onClick={(event) => {
                          event.preventDefault();
                          FindSpotifyUriAndExport(track.title, track.subtitle);
                        }}
                        style={{
                          marginLeft: '20px',
                          marginRight: '20px',
                        }}
                      >
                        Add To Queue
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </form>
          </div>
          </div>

        }
      </div>
    </div>
    </div>
    </section>
  );
}

export default MusicPlayer;
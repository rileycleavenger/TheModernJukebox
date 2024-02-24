import React, { useState, useRef, useEffect} from 'react';
import { QueueObject } from '../../types';
import { addToQueue } from '../../services/QueuePostService';
import useMediaQuery from '../../hooks/useMediaQuery';
import locked from "../../assets/images/locked.png";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";

import { searchShazam } from '../../hooks/shazam';
import { searchSpotify } from '../../hooks/spotify';
import './index.css';
import { addToPlaying } from '../../services/PlayingPostService';
import { getRecommendationsByGenres, getSpotifyGenres } from '../../hooks/spotify';

function MusicPlayer () {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  useEffect(() => {
    if (isAboveMediumScreens) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, []); 

  let token = (sessionStorage.getItem("token") || "");

  // Function to export to queue for the hardware
  function ExportToQueue(duration_ms: string, trackUri: string, trackName: string, trackArtist: string, trackCover: string) {
    const queueObject: QueueObject = {
      uri: trackUri,
      userAccessToken: token,
      duration: duration_ms,
      trackName: trackName,
      trackArtist: trackArtist,
      trackCover: trackCover,
    };
    addToQueue(queueObject);
  }

  // State setup for the Shazam search
  const [shazamSearchResults, setShazamSearchResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to call search
  const handleSearch = async () => {
    if (inputRef.current && typeof inputRef.current !== "undefined") {
      const results = await searchShazam(inputRef.current.value);
      setShazamSearchResults(results);
      setSearch(true);
    }
  };

  // State setup for Spotify search
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

  // Function to call spotify search
  const FindSpotifyUriAndExport = async (trackName: string, trackArtist: string) => {
    const result = await searchSpotify(trackName, trackArtist);
    setSpotifySearchResult(result);
  };

  // State setup for audio previews
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [search, setSearch] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    // Fetch Spotify genres when the component mounts
    const fetchGenres = async () => {
      const fetchedGenres = await getSpotifyGenres();
      setGenres(fetchedGenres);
    };
    fetchGenres();
  }, []);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const handleGetRecommendations = async () => {
    try {
      // Fetch recommendations based on the selected genre
      const shazamSearchResults = await getRecommendationsByGenres([selectedGenre]);
      console.log('Recommendations:', shazamSearchResults);
      setShazamSearchResults(shazamSearchResults);
      setSearch(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <section id="musicplayer" className="gap-16 bg-primary-100 py-10 md:h-full md:w-full md:pb-0">
      <div className="">
        <div>
          {!token && (
            <div className='px-40'>
              <p className="text-lg mt-28">
                The Music Player page allows you to search for your favorite songs and queue them. To gain access to this page, please sign with Spotify.
              </p>
              <div className="flex basis-full justify-center z-10 mt-32 justify-items-end">
                <img alt="locked" src={locked} />
              </div>
            </div>
          )}
          {token && (
            <div className="mt-8">
              <div className="">  
                <form> 
                
                  <div className="buttonsContainer m-4">
                    <input className="rounded-md bg-gray-100 px-2 py-2 text-black m-2" type='text' ref={inputRef} />
                    <button 
                      className="rounded-md bg-primary-500 px-7 py-2 text-white hover:bg-primary-700 m-2 md:mr-8" 
                      type="submit" 
                      onClick={(event) => {
                        event.preventDefault();
                        handleSearch();
                      }}
                    >
                      Search for a Song
                    </button>
                             
                    <select
                      value={selectedGenre}
                      onChange={handleGenreChange}
                      className="rounded-md bg-gray-100 px-3 py-2 text-black m-2 md:ml-8"
                    >
                      <option value="">Select a genre</option>
                      {genres.map((genre, index) => (
                        <option key={index} value={genre}>{genre}</option>
                      ))}
                    </select>
                    <button
                      onClick={
                        (event) => {
                          event.preventDefault();
                        handleGetRecommendations();}}
                      className="rounded-md bg-primary-500 px-2 py-2 text-white hover:bg-primary-700 m-2"
                    >
                      Get Recommendations
                    </button>
                  </div>
                  <div className="queueContainer">
                    <div className="itemContainerWrapper">
                    {search ? (
                      <div className="itemContainer">
                        {shazamSearchResults.map((item, index) => (
                        <div
                          key={index}
                          className={`item ${index === 0 ? 'firstItem' : ''}`}
                          style={{ marginLeft: index === 0 ? 0 : undefined }}
                        >
                          <div className="itemWrapper">
                            <div className="coverartContainer" >
                              <SpeakerWaveIcon className="timesIcon" onClick={() => {
                                if (isAudioPlaying && audio?.src === item.hub.actions[1].uri) {
                                  audio?.pause();
                                  setIsAudioPlaying(false);
                                } else {
                                  if (audio) {
                                    audio.pause();
                                  }
                                  const newAudio = new Audio(item.hub.actions[1].uri);
                                  newAudio.play();
                                  setAudio(newAudio);
                                  setIsAudioPlaying(true);
                                }
                              }}
                              style={{
                                cursor: 'pointer',
                                animation: isAudioPlaying && audio?.src === item.hub.actions[1].uri ? 'pop 0.4s infinite alternate' : 'none',
                                margin: '10px',
                              }} />
                              <img className="coverart" src={item.images.coverart}
                              alt={item.title}
                              onClick={(event) => {
                                event.preventDefault();
                                FindSpotifyUriAndExport(item.title, item.subtitle);
                              }} 
                              />
                            </div>
                            <div style={{ fontSize: '20px', textAlign: 'center', marginTop: '10px' }}>
                              <strong>{item.title}</strong>
                            </div>
                            <div style={{ textAlign: 'center' }}>{item.subtitle}</div>
                          </div>
                        </div>
                        ))}
                      </div>
                      ) : (
                        <div className="itemContainer">
                        {shazamSearchResults.map((item, index) => (
                        <div
                          key={index}
                          className={`item ${index === 0 ? 'firstItem' : ''}`}
                          style={{ marginLeft: index === 0 ? 0 : undefined }}
                        >
                          <div className="itemWrapper">
                            <div className="coverartContainer" >
                              <SpeakerWaveIcon className="timesIcon" onClick={() => {
                                if(item.preview_url === null){
                                  alert("Sorry, this song does not have a preview available.");
                                  return;
                                }
                                else{
                                  if (isAudioPlaying && audio?.src === item.preview_url) {
                                    audio?.pause();
                                    setIsAudioPlaying(false);
                                  } else {
                                    if (audio) {
                                      audio.pause();
                                    }
                                  const newAudio = new Audio(item.preview_url);
                                  newAudio.play();
                                  setAudio(newAudio);
                                  setIsAudioPlaying(true);
                                  }
                                }
                              }} 
                              style={{
                                cursor: 'pointer',
                                animation: isAudioPlaying && audio?.src === item.preview_url ? 'pop 0.4s infinite alternate' : 'none',
                                margin: '20px',
                              }} />
                              <img className="coverart" src={item.album.images[0].url}
                              alt={item.name}
                              onClick={(event) => {
                                event.preventDefault();
                                ExportToQueue(item.duration_ms, item.uri, item.name, item.artists[0].name, item.album.images[0].url)
                              }} 
                              />
                            </div>
                            <div style={{ fontSize: '20px', textAlign: 'center', marginTop: '10px' }}>
                              <strong>{item.name}</strong>
                            </div>
                            <div style={{ textAlign: 'center' }}>{item.artists[0].name}</div>
                          </div>
                        </div>
                        ))}
                      </div>
                      )}
                      
                    </div>
                  </div>
                  
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MusicPlayer;

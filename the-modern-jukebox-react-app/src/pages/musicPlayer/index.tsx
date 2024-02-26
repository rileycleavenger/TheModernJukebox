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
    const inputValueLength = inputRef.current?.value.length || 0;
    if (inputValueLength <= 200){
      if (inputRef.current && typeof inputRef.current !== "undefined") {
        const results = await searchShazam(inputRef.current.value);
        setShazamSearchResults(results);
        setSearch(true);
      }
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
  const [added, setAdded] = useState(false);

  // Mapping of Spotify's shorthand notation to full genre names
  const shorthandToFullName: { [key: string]: string } = {
    "acoustic": "Acoustic",
    "afrobeat": "Afrobeat",
    "alt-rock": "Alternative Rock",
    "alternative": "Alternative",
    "ambient": "Ambient",
    "anime": "Anime",
    "black-metal": "Black Metal",
    "bluegrass": "Bluegrass",
    "blues": "Blues",
    "bossanova": "Bossanova",
    "brazil": "Brazil",
    "breakbeat": "Breakbeat",
    "british": "British",
    "cantopop": "Cantopop",
    "chicago-house": "Chicago House",
    "children": "Children",
    "chill": "Chill",
    "classical": "Classical",
    "club": "Club",
    "comedy": "Comedy",
    "country": "Country",
    "dance": "Dance",
    "dancehall": "Dancehall",
    "death-metal": "Death Metal",
    "deep-house": "Deep House",
    "detroit-techno": "Detroit Techno",
    "disco": "Disco",
    "disney": "Disney",
    "drum-and-bass": "Drum and Bass",
    "dub": "Dub",
    "dubstep": "Dubstep",
    "edm": "EDM",
    "electro": "Electro",
    "electronic": "Electronic",
    "emo": "Emo",
    "folk": "Folk",
    "forro": "Forro",
    "french": "French",
    "funk": "Funk",
    "garage": "Garage",
    "german": "German",
    "gospel": "Gospel",
    "goth": "Goth",
    "grindcore": "Grindcore",
    "groove": "Groove",
    "grunge": "Grunge",
    "guitar": "Guitar",
    "happy": "Happy",
    "hard-rock": "Hard Rock",
    "hardcore": "Hardcore",
    "hardstyle": "Hardstyle",
    "heavy-metal": "Heavy Metal",
    "hip-hop": "Hip Hop",
    "holidays": "Holidays",
    "honky-tonk": "Honky Tonk",
    "house": "House",
    "idm": "IDM",
    "indian": "Indian",
    "indie": "Indie",
    "indie-pop": "Indie Pop",
    "industrial": "Industrial",
    "iranian": "Iranian",
    "j-dance": "J-Dance",
    "j-idol": "J-Idol",
    "j-pop": "J-Pop",
    "j-rock": "J-Rock",
    "jazz": "Jazz",
    "k-pop": "K-Pop",
    "kids": "Kids",
    "latin": "Latin",
    "latino": "Latino",
    "malay": "Malay",
    "mandopop": "Mandopop",
    "metal": "Metal",
    "metal-misc": "Metal Misc",
    "metalcore": "Metalcore",
    "minimal-techno": "Minimal Techno",
    "movies": "Movies",
    "mpb": "MPB",
    "new-age": "New Age",
    "new-release": "New Release",
    "opera": "Opera",
    "pagode": "Pagode",
    "party": "Party",
    "philippines-opm": "Philippines OPM",
    "piano": "Piano",
    "pop": "Pop",
    "pop-film": "Pop Film",
    "post-dubstep": "Post Dubstep",
    "power-pop": "Power Pop",
    "progressive-house": "Progressive House",
    "psych-rock": "Psych Rock",
    "punk": "Punk",
    "punk-rock": "Punk Rock",
    "r-n-b": "R&B",
    "rainy-day": "Rainy Day",
    "reggae": "Reggae",
    "reggaeton": "Reggaeton",
    "road-trip": "Road Trip",
    "rock": "Rock",
    "rock-n-roll": "Rock 'n' Roll",
    "rockabilly": "Rockabilly",
    "romance": "Romance",
    "sad": "Sad",
    "salsa": "Salsa",
    "samba": "Samba",
    "sertanejo": "Sertanejo",
    "show-tunes": "Show Tunes",
    "singer-songwriter": "Singer-Songwriter",
    "ska": "Ska",
    "sleep": "Sleep",
    "songwriter": "Songwriter",
    "soul": "Soul",
    "soundtracks": "Soundtracks",
    "spanish": "Spanish",
    "study": "Study",
    "summer": "Summer",
    "swedish": "Swedish",
    "synth-pop": "Synth Pop",
    "tango": "Tango",
    "techno": "Techno",
    "trance": "Trance",
    "trip-hop": "Trip Hop",
    "turkish": "Turkish",
    "work-out": "Workout",
    "world-music": "World Music"
  };

  // Mapping of full genre names to Spotify's shorthand notation
  const fullNameToShorthand: { [key: string]: string } = {};
  Object.entries(shorthandToFullName).forEach(([key, value]) => {
    fullNameToShorthand[value.toLowerCase()] = key;
  });

  useEffect(() => {
    // Fetch Spotify genres when the component mounts
    const fetchGenres = async () => {
      const fetchedGenres = await getSpotifyGenres();
      setGenres(fetchedGenres);
    };
    fetchGenres();
  }, []);

  const handleClick = () => {
    setTimeout(() => {
        setAdded(false);
    }, 500);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const handleGetRecommendations = async () => {
    try {
      // Fetch recommendations based on the selected genre
      const shorthandGenre = fullNameToShorthand[selectedGenre.toLowerCase()];
      const shazamSearchResults = await getRecommendationsByGenres([shorthandGenre]);
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
            <div className="mt-16">
              <div className="">  
                <form> 
                
                  <div className="buttonsSearchContainer m-4">
                    <input className="rounded-md bg-gray-100 px-2 py-2 text-black m-2" type='text' ref={inputRef} />
                    <button 
                      className="rounded-md bg-primary-500 px-7 py-2 text-white hover:bg-primary-700 m-2 md:mr-8" 
                      type="submit" 
                      onClick={(event) => {
                        event.preventDefault();
                        handleSearch();
                        handleClick();
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
                        <option key={index} value={shorthandToFullName[genre] || genre}>{shorthandToFullName[genre] || genre}</option>
                      ))}
                    </select>
                    <button
                      onClick={
                        (event) => {
                          event.preventDefault();
                          handleGetRecommendations();
                          handleClick();
                        }}
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
                                handleClick();
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
                                handleClick();
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

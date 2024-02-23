import React, { useState, useRef, useEffect} from 'react';
import { QueueObject } from '../../types';
import { addToQueue } from '../../services/QueuePostService';
import useMediaQuery from '../../hooks/useMediaQuery';
import { motion } from "framer-motion";
import locked from "../../assets/images/locked.png";
import { SparklesIcon } from "@heroicons/react/24/solid";
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

  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  // Mapping of Spotify's shorthand notation to full genre names
  const genreMapping: { [key: string]: string } = {
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
    "children": "Children's Music",
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
    "edm": "Electronic Dance Music",
    "electro": "Electro",
    "electronic": "Electronic",
    "emo": "Emo",
    "folk": "Folk",
    "forro": "Forró",
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
    "idm": "Intelligent Dance Music",
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
    "metal-misc": "Miscellaneous Metal",
    "metalcore": "Metalcore",
    "minimal-techno": "Minimal Techno",
    "movies": "Movie Soundtracks",
    "mpb": "Música Popular Brasileira",
    "new-age": "New Age",
    "new-release": "New Release",
    "opera": "Opera",
    "pagode": "Pagode",
    "party": "Party",
    "philippines-opm": "OPM (Original Pilipino Music)",
    "piano": "Piano",
    "pop": "Pop",
    "pop-film": "Film Pop",
    "post-dubstep": "Post-Dubstep",
    "power-pop": "Power Pop",
    "progressive-house": "Progressive House",
    "psych-rock": "Psychedelic Rock",
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
    "singer-songwriter": "Singer/Songwriter",
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
      const recommendations = await getRecommendationsByGenres([selectedGenre]);
      console.log('Recommendations:', recommendations);
      setRecommendations(recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <section id="musicplayer" className="gap-16 bg-primary-100 py-10 md:h-full md:pb-0">
      <div className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6">
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
            <div className="mt-16 px-40">
              <div className="flex items-center gap-2">
                <SparklesIcon className="h-6 w-6 text-white" />
                <p className="text-lg">Search and queue your favorite songs</p> 
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
                          <p style={{ margin: '20px' }}>
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
                              style={{ marginLeft: '20px', marginRight: '20px' }}
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
          )}
        </div>
      </div>
      <div className="bg-primary-100 py-4 px-6 rounded-lg">
      <select
        value={selectedGenre}
        onChange={handleGenreChange}
        className="rounded-md bg-gray-100 px-3 py-2 text-black mr-2"
      >
        <option value="">Select a genre</option>
        {genres.map((genre, index) => (
          <option key={index} value={genreMapping[genre] || genre}>{genreMapping[genre] || genre}</option>
        ))}
      </select>

      <button
        onClick={handleGetRecommendations}
        className="rounded-md bg-primary-500 px-4 py-2 text-white hover:bg-primary-700"
      >
        Get Recommendations
      </button>

      {recommendations.length > 0 && (
        <div className="flex flex-col mt-8"> 
          <div className="grid gap-4 grid-cols-6">
            {recommendations.map((track: any, index: number) => (
              <div key={index} className="flex flex-col items-center">
                  <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    onClick={() => {
                        if(track.preview_url === null){
                          alert("Sorry, this song does not have a preview available.");
                          return;
                        }
                        else{
                          if (isAudioPlaying && audio?.src === track.preview_url) {
                            audio?.pause();
                            setIsAudioPlaying(false);
                          } else {
                            if (audio) {
                              audio.pause();
                            }
                            const newAudio = new Audio(track.preview_url);
                            newAudio.play();
                            setAudio(newAudio);
                            setIsAudioPlaying(true);
                          }
                        }
                    }} 
                    style={{
                      cursor: 'pointer',
                      animation: isAudioPlaying && audio?.src === track.preview_url ? 'pop 0.4s infinite alternate' : 'none',
                      margin: '20px',
                    }}
                  />
                <p style={{ margin: '20px' }}>
                  <strong>{track.name}</strong>
                  <br />
                  {track.artists[0].name}
                </p>
                <button 
                  className="rounded-md bg-primary-500 px-2 py-2 hover:bg-primary-700" 
                  type="submit" 
                  onClick={(event) => {
                    event.preventDefault();
                    ExportToQueue(track.duration_ms, track.uri, track.name, track.artists[0].name, track.album.images[0].url)
                  }}
                  style={{ marginLeft: '20px', marginRight: '20px' }}
                >
                  Add To Queue
                </button>
              </div>
            ))}
          </div> 
        </div>
      )}
    </div>
    </section>
  );
}

export default MusicPlayer;

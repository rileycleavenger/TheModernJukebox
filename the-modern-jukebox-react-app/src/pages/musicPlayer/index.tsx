import {useEffect, useState, useRef} from 'react';
import { getTokenFromUrl } from '../../hooks/spotify';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { QueueObject } from '../../types';
import { addToQueue } from '../../services/SpotifyPostService';
import axios from 'axios';
import React from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { SelectedPage } from '../../assets/variables/availablepages';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import locked from "../../assets/images/locked.png";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { searchShazam } from '../../hooks/shazam';
import { searchSpotify } from '../../hooks/spotify';

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const MusicPlayer = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
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
    console.log("What is Posted:", queueObject);

    // post the variable to the hardware
    addToQueue(queueObject);
  }

  // function used to format an item as a queue item
  function FormatTrack(track: any): any {
    return {
      track: {
        name: track.name,
        uri: track.uri,
        duration_ms: track.duration_ms,
        album: {
          name: track.album.name,
          images: [
            {
              url: track.album.images[0].url,
            },
          ],
        },
      },
    };
  }

  // useState setup for the Shazam search
  const [shazamSearchResults, setShazamSearchResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = async () => {
    if (inputRef.current && typeof inputRef.current !== "undefined") {
      const results = await searchShazam(inputRef.current.value);
      setShazamSearchResults(results);
    }
  };

  // useState setup for Spotify search
  const [spotifySearchResults, setSpotifySearchResults] = useState<any[]>([]);
  const FindSpotifyUriAndExport = async (trackName: string, trackArtist: string) => {
    const results = await searchSpotify(trackName + " " + trackArtist);
    setSpotifySearchResults(results);
    
    const trackToQueue = FormatTrack(spotifySearchResults[0])
    ExportToQueue(trackToQueue.duration_ms,trackToQueue.uri, trackToQueue.name, trackToQueue.artistName, trackToQueue.images)
  };

  const [quickSearch, setQuickSearch] = useState("");
  interface s {
    track: {
      name: "";
      uri: "";
      duration_ms:"";
      album:{
        name: "";
        images: [
          {
            url: "";
          }
        ];
      };
    };
   }
  const [songs, setSongs] = useState([]);
  
  const searchSongs = async (e: any) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search",{
      headers:{
        Authorization:`Bearer ${token}`
      },
      params:{
        q:quickSearch,
        limit:6,
        type: "track"
      }
    }) 
    console.log(data);
    setSongs(
      data.tracks.items.map(
        (track: {
          name: "";
          uri: "";
          duration_ms:"";
          album:{
            name: "";
            artists: [
              {
                name: "";
              }
            ];
            images: [
              {
                url: "";
              }
            ];
          };
        }) => {
          return {
            name: track.name,
            uri: track.uri,
            duration_ms: track.duration_ms,
            images: track.album.images[0].url,
            albumName: track.album.name,
            artistName: track.album.artists[0].name,
          };
        }
      )|| {}
      );
      
  }

  return (
    <section id="musicplayer" className="gap-16 bg-primary-100 py-10 md:h-full md:pb-0">
    <motion.div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
        onViewportEnter={() => setSelectedPage(SelectedPage.MusicPlayer)}
    >
    <div>
      <div>
       {!token &&
          <div>
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
          <div className="mt-16">    
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
              <button className="rounded-md bg-primary-500 px-10 py-2 hover:bg-primary-700" type='submit' onClick={handleSearch}>Search</button>
            </div>
            <div className="flex flex-col mt-8"> 
              <div className="grid gap-4 grid-cols-6">
                {shazamSearchResults.map((track: any) => (
                  <div key={track.id}>
                    <img src={track.images.coverart} alt={track.title} />
                    <p>
                      {track.title} by {track.subtitle}
                    </p>
                    <button className="rounded-md bg-primary-500 px-2 py-2 hover:bg-primary-700" type="submit" onClick={() => FindSpotifyUriAndExport(track.title, track.subtitle)}>
                      Add To Queue
                    </button>
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
    </motion.div>
    </section>
  );
}

export default MusicPlayer;
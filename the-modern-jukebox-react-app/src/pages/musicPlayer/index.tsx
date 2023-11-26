import {useEffect, useState} from 'react';
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
type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

let token = (sessionStorage.getItem("token")|| "")

const MusicPlayer = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  function ExportToQueue(trackUri: string, tackName: string, trackArtist: string, trackCover: string) {
    // create a variable of type QueueObject that is made with the uri and the token
    const queueObject: QueueObject = {
      uri: trackUri,
      userAccessToken: token,
      trackName: tackName,
      trackArtist: trackArtist,
      trackCover: trackCover,
    };
    console.log("What is Posted:", queueObject);

    // post the variable to the hardware
    addToQueue(queueObject);
  }

  const [quickSearch, setQuickSearch] = useState("");
  interface s {
    track: {
      name: "";
      uri: "";
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
        type: "track"
      }
    }) 
    console.log(data);
    setSongs(
      data.tracks.items.map(
        (track: {
          name: "";
          uri: "";
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
            images: track.album.images[0].url,
            albumName: track.album.name,
            artistName: track.album.artists[0].name,
          };
        }
      )|| {}
      );
      
  }
  console.log(token);
  console.log(songs);
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
          <p className="text-lg mt-24">
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
          <form onSubmit={searchSongs}>
            <input type='text' onChange={e => setQuickSearch(e.target.value)} />
            <button type='submit'>Search</button>
            <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">  
            {songs.map((track: {
                name: '',
                artistName: '',
                images:''
                uri: ''
              }) => {
                  return (
                        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                            <img src={track.images} />
                            <p>
                                {track.name} by {track.artistName}
                            </p>
                            <button type='submit' onClick={() => ExportToQueue(track.uri, track.name, track.artistName, track.images)}>
                                Add To Queue
                            </button>
                        </div>
                  )
              })}
            </div>
            </div>
          </form>

        }
      </div>
    </div>
    </motion.div>
    </section>
  );
}

export default MusicPlayer;
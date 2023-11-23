import {useEffect, useState} from 'react';
import { getTokenFromUrl } from '../../hooks/spotify';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { SpotifyObjectForHardware } from '../../types';
import axios from 'axios';

let token = (sessionStorage.getItem("token")|| "")

function MusicPlayer() {

  function ExportToQueue(trackUri: string) {
    // create a variable of type SpotifyObjectForHardware that is made with the uri and the token
    const queueObject: SpotifyObjectForHardware = {
      uri: trackUri,
      userAccessToken: token,
    };
    console.log("test", queueObject);
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
    <div>
      <div>
       {!token &&
          <h1>This is the music player page! To gain access to this page, please login.</h1>
        }
        {token &&
          <form onSubmit={searchSongs}>
            <input type='text' onChange={e => setQuickSearch(e.target.value)} />
            <button type='submit'>Search</button>
            <div>
            {songs.map((track: {
                name: '',
                artistName: '',
                images:''
                uri: ''
              }) => {
                  return (
                    <div>
                      <img src={track.images} />
                      <p>{track.name} by {track.artistName}</p>
                      <button type='submit' onClick={() => ExportToQueue(track.uri)}>Send To Device</button>
                    </div>
                  )
              })}
            </div>
          </form>

        }
      </div>
    </div>
  );
}

export default MusicPlayer;
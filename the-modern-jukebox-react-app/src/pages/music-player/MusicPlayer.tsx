import {useEffect, useState} from 'react';
import { getTokenFromUrl } from '../../hooks/spotify';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import axios from 'axios';

let token = (sessionStorage.getItem("token")|| "")

function MusicPlayer() {
  //console.log(sessionStorage.getItem("token"))
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
              }) => {
                  return (
                    <div>
                      <img src={track.images} />
                      <p>{track.name} by {track.artistName}</p>
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
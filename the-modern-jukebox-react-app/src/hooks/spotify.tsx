// code adapted from:
//https://javascript.plainenglish.io/how-to-include-spotify-authorization-in-your-react-app-577b63138fd7
import {useEffect, useState} from 'react';
import axios from 'axios';

export const authEndpoint = "https://accounts.spotify.com/authorize";
//for testing
//const redirectURL = "http://localhost:3000/login/"
//for deployment
const clientId = "3c6b67b44db2400db60002e9a5e89bb2"

let redirectURL = '';
if (window.location.origin.includes('localhost')) {
  // Development environment
  redirectURL = 'http://localhost:3000/home/';
} else {
  // Production environment
  redirectURL = `${window.location.origin}/home`;
}

//possible scopes:
//https://developer.spotify.com/documentation/web-api/concepts/scopes
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state"
]

export const loginURL = `${authEndpoint}?
client_id=${clientId}
&redirect_uri=${redirectURL}
&scope=${scopes.join("%20")}
&response_type=token
&show_dialog=true`

//essential for report
//https://developer.spotify.com/documentation/web-api/tutorials/code-flow
export const getTokenFromUrl = ()=>{
    let token = window.location.hash.substring(1).split('&').find(Element => Element.startsWith("access_token"))?.split("=")[1]
    return token
}

export const getTrackFromUri = async (uri: string) => {
  let token = sessionStorage.getItem("token");

  console.log("token", token)

  // Extract the track ID from the URI
  const trackId = uri.split(':')[2];

  try {
    // Make an API call to fetch the track details using the track ID
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response)

    // Extract the required track details from the API response
    const trackName = response.data.name;
    const trackArtist = response.data.artists[0].name;
    const trackCover = response.data.album.images[0].url;

    // Return the track details
    return {
      trackName,
      trackArtist,
      trackCover,
    };
  } catch (error) {
    console.error('Error fetching track details:', error);
    return null;
  }
};

export {}
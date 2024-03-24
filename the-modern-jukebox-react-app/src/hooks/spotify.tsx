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
  redirectURL = 'http://localhost:3000';
} else {
  // Production environment
  redirectURL = `${window.location.origin}`;
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

/* export const getTrackFromUri = async (uri: string) => {
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
    alert("Error during Spotify search, please create or join a new session");
    console.error('Error fetching track details:', error);
    return null;
  }
}; */

// function used to make a GET req to spotify for searching
export async function searchSpotify(trackName: string, trackArtist: string): Promise<any> {
  if (!trackName && !trackArtist) {
    return [];
  }

  // get user token
  let token = sessionStorage.getItem("token") || "";

  // define req url
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(`track:${trackName} artist:${trackArtist}`)}&type=track`;

  // define options
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    // make the fetch request
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    // get the response data
    const responseData = await response.json();
    const track = responseData.tracks.items[0];
    if(!track) {
      console.log('No track found');

      // try searching for the track without the feature in the title
      const trackNameWithoutFeature = trackName.replace(/\(feat\. .+\)/i, '');
      const urlWithoutFeature = `https://api.spotify.com/v1/search?q=${encodeURIComponent(`track:${trackNameWithoutFeature} artist:${trackArtist}`)}&type=track`;
      const responseWithoutFeature = await fetch(urlWithoutFeature, options);
      if (!responseWithoutFeature.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseDataWithoutFeature = await responseWithoutFeature.json();
      const trackWithoutFeature = responseDataWithoutFeature.tracks.items[0];
      if (trackWithoutFeature) {
        console.log('Track found without feature:', trackWithoutFeature);
        return trackWithoutFeature;
      }
      else{
        alert("That song can't be found on Spotify, please try another song");
      }

    }
    return track;
  } catch (error) {
    // log any errors
    console.log("searchSpotify");
    sessionStorage.setItem("token","");
    alert("Error during Spotify search, please create or join a new session");
    console.error('Error during Spotify search:', error);
    return [];
  }
}

export async function getSpotifyGenres(): Promise<string[]> {
  // Get user token from session storage
  const token = sessionStorage.getItem("token") || "";

  // Construct the request URL
  const url = 'https://api.spotify.com/v1/recommendations/available-genre-seeds';

  // Define request options
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    // Make the fetch request
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    // Parse the response JSON
    const responseData = await response.json();

    // Extract and return genres
    return responseData.genres || [];
  } catch (error) {
    // Log any errors
    console.log("getSpotifyGenres");
    sessionStorage.setItem("token","");
    console.error('Error fetching Spotify genres:', error);
    return [];
  }
}

export async function getRecommendationsByGenres(seedGenres: string[]): Promise<any[]> {
  // Get user token from session storage
  const token = sessionStorage.getItem("token") || "";

  // Construct the request URL
  const url = `https://api.spotify.com/v1/recommendations?seed_genres=${seedGenres.join(',')}`;

  // Define request options
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    // Make the fetch request
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
    // Parse the response JSON
    const responseData = await response.json();

    // Extract and return recommendations
    return responseData.tracks || [];
  } catch (error) {
    sessionStorage.setItem("token","");
    // Log any errors
    console.log("getRecommendationsByGenres");
    alert("Error with Spotify recommendations: " + error);
    console.error('Error fetching recommendations:', error);
    return [];
  }
}

export {}
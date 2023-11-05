// code adapted from:
//https://javascript.plainenglish.io/how-to-include-spotify-authorization-in-your-react-app-577b63138fd7
import {useEffect, useState} from 'react';

export const authEndpoint = "https://accounts.spotify.com/authorize";
//for testing
//const redirectURL = "http://localhost:3000/login/"
//for deployment
const redirectURL = "https://the-modern-jukebox-react-app.vercel.app/login"
const clientId = "3c6b67b44db2400db60002e9a5e89bb2"

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
    //window.localStorage.setItem("token",token)
    return token
}
export {}
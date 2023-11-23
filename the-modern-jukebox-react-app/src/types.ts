export type SpotifyObjectForHardware = {
    uri: string;
    userAccessToken: string; // more details at https://developer.spotify.com/documentation/web-api/concepts/access-token
}

export type QueueObject = {
    uri: string;
    userAccessToken: string;
    trackName: string;
    trackArtist: string;
    trackCover: string;
}

export type QueueObject = {
    uri: string;
    userAccessToken: string;
    duration: string;
    trackName: string;
    trackArtist: string;
    trackCover: string;
}

export type Controls = {
    play: boolean;
    pause: boolean;
    next: boolean;
    previous: boolean;
}

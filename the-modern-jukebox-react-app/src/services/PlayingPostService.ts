import { QueueObject } from '../types';


function getReceiveUrl(sessionID: string): string {
    if (window.location.origin.includes('localhost')) {
        // Development environment
        return `http://localhost:8080/api/${sessionID}/playing`;
    } else {
        // Production environment
        return `${window.location.origin}/api/${sessionID}/playing`;
    }
}

function getSendUrl(sessionID: string): string {
    if (window.location.origin.includes('localhost')) {
        // Development environment
        return `http://localhost:8080/api/${sessionID}/addPlaying`;
    } else {
        // Production environment
        return `${window.location.origin}/api/${sessionID}/addPlaying`;
    }
}

// function that returns QueueObject for the song now playing at the receieveUrl
export const getPlaying = async (sessionID: string): Promise<QueueObject> => {
    try {
        const response = await fetch(getReceiveUrl(sessionID));
        const json = await response.json();
        // console.log('getPlaying response:', json)
        return json as QueueObject;
    } catch (error) { 
        console.error('Error getting currently playing:', error);
        return {} as QueueObject;
    }
};


export const addToPlaying = async (spotifyObject: QueueObject, sessionID:string) => {
    try {
        await fetch(getSendUrl(sessionID), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: spotifyObject }),
        });
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

// function to clear the currently playing song
export const clearPlaying = async (sessionID: string) => {
    try {
        await fetch(getReceiveUrl(sessionID), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error clearing now playing:', error);
    }
};




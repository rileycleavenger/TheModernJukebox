import { QueueObject } from '../types';


let receieveUrl = '';
if (window.location.origin.includes('localhost')) {
    // Development environment
    receieveUrl = 'http://localhost:8080/api/playing';
} else {
    // Production environment
    receieveUrl = `${window.location.origin}/api/playing`;
}

let sendUrl = '';
if (window.location.origin.includes('localhost')) {
    // Development environment
    sendUrl = 'http://localhost:8080/api/addPlaying';
} else {
    // Production environment
    sendUrl = `${window.location.origin}/api/addPlaying`;
}

// function that returns QueueObject for the song now playing at the receieveUrl
export const getPlaying = async (): Promise<QueueObject> => {
    try {
        const response = await fetch(receieveUrl);
        const json = await response.json();
        return json as QueueObject;
    } catch (error) { 
        console.error('Error getting currently playing:', error);
        return {} as QueueObject;
    }
};


export const addToPlaying = async (spotifyObject: QueueObject) => {
    try {
        await fetch(sendUrl, {
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
export const clearPlaying = async () => {
    try {
        await fetch(receieveUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error clearing now playing:', error);
    }
};




import { get } from 'http';
import { QueueObject } from '../types';

function getReceiveUrl(sessionID: string): string {
    if (window.location.origin.includes('localhost')) {
        // Development environment
        return `http://localhost:8080/api/${sessionID}/queue`;
    } else {
        // Production environment
        return `${window.location.origin}/api/${sessionID}/queue`;
    }
}

function getSendUrl(sessionID: string): string {
    if (window.location.origin.includes('localhost')) {
        // Development environment
        return `http://localhost:8080/api/${sessionID}/addQueue`;
    } else {
        // Production environment
        return `${window.location.origin}/api/${sessionID}/addQueue`;
    }
}

// function that returns QueueObject[] from the queue at the receieveUrl
export const getQueue = async (sessionID:string): Promise<QueueObject[]> => {
    try {
        const response = await fetch(getReceiveUrl(sessionID));
        const json = await response.json();
        return json as QueueObject[];
    } catch (error) {
        console.error('Error getting queue:', error);
        return [];
    }
};

// function to add to the queue that sends a QueueObject to the sendUrl
export const addToQueue = async (spotifyObject: QueueObject, sessionID: string) => {
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

// function to clear the queue that clears all data stored at receieveUrl
export const clearQueue = async (sessionID:string) => {
    try {
        await fetch(getReceiveUrl(sessionID), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error clearing queue:', error);
    }
};

// function to remove the first instance of a song from the queue based on QueueObject.uri
export const removeSong = async (item: QueueObject, sessionID: string) => {
    try {
        let newQueue: QueueObject[] = [];
        let removed = false;

        await getQueue(sessionID).then((queue) => {
            queue.forEach((song) => {
                if (!removed && song.uri === item.uri) {
                    removed = true;
                } else {
                    newQueue.push(song);
                }
            });
        });

        await clearQueue(sessionID);
        for (let i = 0; i < newQueue.length; i++) {
            await addToQueue(newQueue[i], sessionID);
        }
    } catch (error) {
        console.error('Error removing song:', error);
    }
};







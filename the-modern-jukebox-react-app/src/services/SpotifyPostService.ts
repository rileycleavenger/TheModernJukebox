import React, { useEffect, useState } from 'react';
import { QueueObject} from '../types';


let receieveUrl = '';
if (window.location.origin.includes('localhost')) {
    // Development environment
    receieveUrl = 'http://localhost:8080/api/queue';
} else {
    // Production environment
    receieveUrl = `${window.location.origin}/api/queue`;
}

let sendUrl = '';
if (window.location.origin.includes('localhost')) {
    // Development environment
    sendUrl = 'http://localhost:8080/api/addQueue';
} else {
    // Production environment
    sendUrl = `${window.location.origin}/api/addQueue`;
}

// function that returns QueueObject[] from the queue at the receieveUrl
export const getQueue = async (): Promise<QueueObject[]> => {
    try {
        const response = await fetch(receieveUrl);
        const json = await response.json();
        return json as QueueObject[];
    } catch (error) {
        console.error('Error getting queue:', error);
        return [];
    }
};


export const addToQueue = async (spotifyObject: QueueObject) => {
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

// function to clear the queue that clears all data stored at receieveUrl
export const clearQueue = async () => {
    try {
        await fetch(receieveUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error clearing queue:', error);
    }
};




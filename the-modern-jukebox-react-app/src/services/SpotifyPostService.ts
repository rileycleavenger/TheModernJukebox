import React, { useEffect, useState } from 'react';
import { SpotifyObjectForHardware } from '../types';


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



export const fetchData = async () => {
    const [queue, setQueue] = useState<string[]>([]);
    try {
        const response = await fetch(receieveUrl);
        const data = await response.json();
        setQueue(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

useEffect(() => {
fetchData();
}, []);

export const addToQueue = async (spotifyObject: SpotifyObjectForHardware) => {
    try {
        await fetch(sendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(spotifyObject),
        });
    } catch (error) {
        console.error('Error sending message:', error);
    }
};



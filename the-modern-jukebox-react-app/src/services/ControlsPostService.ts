import { Controls } from '../types';

function getReceiveUrl(sessionID: string): string {
    if (window.location.origin.includes('localhost')) {
        // Development environment
        return `http://localhost:8080/api/${sessionID}/controls`;
    } else {
        // Production environment
        return `${window.location.origin}/api/${sessionID}/controls`;
    }
}

function getSendUrl(sessionID: string): string {
    if (window.location.origin.includes('localhost')) {
        // Development environment
        return `http://localhost:8080/api/${sessionID}/addControls`;
    } else {
        // Production environment
        return `${window.location.origin}/api/${sessionID}/addControls`;
    }
}

// function that returns Controls for the controls at the receieveUrl
export const getControls = async (sessionID: string): Promise<Controls> => {
    try {
        const response = await fetch(getReceiveUrl(sessionID));
        const json = await response.json();
        return json as Controls;
    } catch (error) { 
        console.error('Error getting controls:', error);
        return {} as Controls;
    }
};

// function to make new control input
export const addToControls = async (controlInput: Controls, sessionID: string) => {
    try {
        await fetch(getSendUrl(sessionID), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: controlInput }),
        });
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

// function to clear the current control inpput
export const clearControls = async (sessionID: string) => {
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




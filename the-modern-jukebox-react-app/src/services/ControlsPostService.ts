import { Controls } from '../types';

let receieveUrl = '';
if (window.location.origin.includes('localhost')) {
    // Development environment
    receieveUrl = 'http://localhost:8080/api/controls';
} else {
    // Production environment
    receieveUrl = `${window.location.origin}/api/controls`;
}

let sendUrl = '';
if (window.location.origin.includes('localhost')) {
    // Development environment
    sendUrl = 'http://localhost:8080/api/addControls';
} else {
    // Production environment
    sendUrl = `${window.location.origin}/api/addControls`;
}

// function that returns Controls for the controls at the receieveUrl
export const getControls = async (): Promise<Controls> => {
    try {
        const response = await fetch(receieveUrl);
        const json = await response.json();
        return json as Controls;
    } catch (error) { 
        console.error('Error getting controls:', error);
        return {} as Controls;
    }
};

// function to make new control input
export const addToControls = async (controlInput: Controls) => {
    try {
        await fetch(sendUrl, {
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
export const clearControls = async () => {
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




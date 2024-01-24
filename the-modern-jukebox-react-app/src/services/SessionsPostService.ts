import { Session } from '../types';

let receieveUrl = '';
if (window.location.origin.includes('localhost')) {
    // Development environment
    receieveUrl = 'http://localhost:8080/api/sessions';
} else {
    // Production environment
    receieveUrl = `${window.location.origin}/api/sessions`;
}

let sendUrl = '';
if (window.location.origin.includes('localhost')) {
    // Development environment
    sendUrl = 'http://localhost:8080/api/addSession';
} else {
    // Production environment
    sendUrl = `${window.location.origin}/api/addSession`;
}

// function that returns Session[] from the list of active sessions at the receieveUrl
export const getSessions = async (): Promise<Session[]> => {
    try {
        const response = await fetch(receieveUrl);
        const json = await response.json();
        return json as Session[];
    } catch (error) {
        console.error('Error getting sessions:', error);
        return [];
    }
};

// function used to add a new session to the list of active sessions at the sendUrl
export const addNewSession = async (newSession: Session) => {
    try {
        await fetch(sendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: newSession }),
        });
    } catch (error) {
        console.error('Error adding session:', error);
    }
};

// function to delete all sessions
export const deleteAllSessions = async () => {
    try {
        await fetch(receieveUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error clearing sessions:', error);
    }
};




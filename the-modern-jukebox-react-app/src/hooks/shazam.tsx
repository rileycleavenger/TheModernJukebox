// function to search Shazam for a song
export async function searchShazam(searchTerm: string): Promise<any[]> {
    if(!searchTerm) {
        return [];
    }
    const url = `https://shazam.p.rapidapi.com/search?term=${encodeURIComponent(searchTerm)}&locale=en-US&offset=0&limit=10`;

    // options for the fetch request
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '947bde9a0amsh09befba447e0849p1b12e2jsn2655254e4e5c',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    try {

        // make the fetch request
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // get the response data
        const responseData = await response.json();
        const tracks = responseData.tracks.hits.map((hit: any) => hit.track);
        console.log('Shazam search results:', tracks);
        return tracks;

    } catch (error) {
        
        // log any errors
        console.error('Error during Shazam search:', error);
        return [];
    }
}
  
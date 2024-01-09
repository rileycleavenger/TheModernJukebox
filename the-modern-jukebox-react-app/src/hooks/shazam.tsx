// function to search Shazam for a song
export async function searchShazam(searchTerm: string): Promise<any[]> {
    const url = `https://shazam.p.rapidapi.com/search?term=${encodeURIComponent(searchTerm)}&locale=en-US&offset=0&limit=5`;

    // options for the fetch request
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3c0b6b9b8dmshc2d7f9eb0f7b7c1p1e0c01jsn53bc70710e0c',
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
  
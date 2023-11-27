# TheModernJukebox

- [Project Pitch](https://drive.google.com/file/d/1aa3IiDKp-Ap4I-m9czUQ7GLiG4GO3_Lz/view)

## Design Prototype
### Known Bugs
- The mobile layout is inconsisent across device screen sizes
- The mobile layout does not include a Login button
- The ExpressJS server that is hosted on Vercel will periodically refresh, leading to the current queue data to be cleared

### Software Additions
#### ExpressJS Server
In this milestone we successfully implemented an [ExpressJS server](https://github.com/rileycleavenger/TheModernJukebox/blob/main/the-modern-jukebox-react-app/api/index.js), which in a development enviorment is launched when calling `npm start`, then is continuously running in our production environment through Vercel. The purpose of this is to manage the songs in the queue and which user they were added by. This functions by storing an array of `QueueObject` items in json format at the endpoint `/api/queue`. This data is routed through the endpoint `/api/addQueue`. Through the combination of a HTTP PUSH and an HTTP GET, respecitvely, the server is able to consistenly host the data at the `/api/queue` endpoint. Finally, the server also has the capability to perform HTTP DELETE requests on the data at `/api/queue`.

#### Queue Functionality 
The music queue is an integral part to our project and in this milestone we were able to get it to correctly function. This was done through our personal ExpressJS server which stores the data at the endpoint `/api/queue`. From there, both the software and hardware can access the items in the queue, along with which user added those items. On the software frontend side, the queue can be displayed to the user, showcasing the track, artist, and album cover by performing an HTTP GET request on the `/api/queue` link. Similarly, the user can also clear the queue, which is done by performing an HTTP DELETE.

#### Software Redesign
We also took this time to completelty redesign the software interface to not only make it prettier, but more user friendly as well. Now our webapp is one static page and the navigation bar buttons will take the user to the respective section of the page. The navigation bar buttons themselves will be highlighted based on where on the page the user is if they decide to scroll themselves. Furthermore, users will also be locked out of other features until signing in.

### Hardware Additions

See the [README.md file](https://github.com/rileycleavenger/TheModernJukebox/blob/main/hardware_src/README.md)https://github.com/rileycleavenger/TheModernJukebox/blob/main/hardware_src/README.md in hardware_src

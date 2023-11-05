# TheModernJukebox

- [Project Pitch](https://drive.google.com/file/d/1aa3IiDKp-Ap4I-m9czUQ7GLiG4GO3_Lz/view)

## Interface Model
![image](https://github.com/rileycleavenger/TheModernJukebox/assets/73538882/d8f6f1e4-c460-4fd4-9944-4bfd59a72c38)

## Pre-Alpha Build
### Software
#### React App
The React App opens to a login page. Users can select the API they will be logging into, either Spotify or Apple Music, then input Spotify/Apple Music logins.
The app also has a music search page where the user can search for a song or artist after logging in.
#### Spotify Music API
The Spotify Music API works for login at this current juncture, however there are certain steps that must be followed. Since the functionality is still in development, users must first have their Spotify account added to the API development webpage in order for their login to connect them to the API itself, otherwise they will login but not be connected to the API and there will be no functionality.
The React App currently has a button on the login page that is a shortcut that allows users to directly to the API through logging in through another webpage. This is mainly for testing and will be phased out as we develop further.
After logging in correctly, we can go to the music search page in the app and search for songs, and the API will show us results based on the search query.
#### Apple Music API
The Apple Music API is still not functional, as it has run into a couple of bumps. These issues are listed below as well as in the Apple Music API issues page on the github webpage.
There are many more hoops to jump through to get access to the Apple Music API through iPod JS. Our project cannot simply access the API, it has to acquire developer tokens. In order to do this, our team would have to sign up for the Apple Developer program with government IDs through an application process. Additionally, we would have to pay a yearly fee of $100 to be able to access the API using developer tokens.
On top of this, there are specific policies that Apple has in place that could get in the way of future development. In addition to waiting for our application to be approved and paying the fee, once our project has access to the API we only have a limited number of times that our token can be used in a given amount of time. This could cause many issues in development, more specifically in terms of testing and deployment of the software itself, as having a limited number of times we can connect to the API could mean that the Apple Music portion of our software could possibly be non-operational for a substantial amount of time.
All this information was gathered by looking into the Apple Music API documentation, as well as through a lengthy phone call with Apple Developer Support. Future work into this sector of the project will need consultation with Chase Ruskin as well as a consensus among the project group as to where to go next.
There is some preliminary code that we have completed for interfacing with the Apple Music API, but due to the issues above we have not been able to test this in any meaningful way. This code has not been merged with the main branch, but it is available for viewing in the Apple Music API branch on the github.
### Hardware
#### ESP32 Wifi Setup
The wifi setup for the esp32 uses the espidf package that espressif provides. The link to download and to run this program can be found at the following link: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/windows-setup.html. 
This allowed for an easy python script to be ran that creates a new project directory and sets up the necessary target and make files. 
The code that is provided in the following github repository (https://github.com/blake-budd1/esp32_setup/tree/master) sets up the two different options we have for wifi. The first is using the 'AP' option, where the name, password, maximum connections, and channel the network that will be hosted on the ESP32 board will be. Once this is setup, it's possible to start the network and be able to connect to the esp32 from any device. 
The second option for wifi is using the 'STA' option. This allows you to specify the name and password of the network you want the esp32 to connect. Once this is completed, the esp32 allows the wifi to be configured in STA mode and then the board will connect to the network once it is flashed to the hardware. 
The espressif espidf allows for the esp32 to be flashed simply by running one command to build the program, flash it, and monitor the output: idf.py -p <com port> build flash monitor.

#### ST7789 Setup
The ST7789 (TFT display) was setup using the lvgl v7 framework, which has support for the st7789 screen that is being used. As of right now, the screen displays a stress test to ensure that the screen was wired properly and the settings for the screen were correct. The lvgl framework was downloaded within the epsressif espidf download that was used for the ESP32 setup. This can be imported into any project that is using the espidf framework to build, flash, and monitor the output for the ESP32. 

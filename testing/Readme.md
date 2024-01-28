Instructions to run the back-end on the raspberry pi.

As of this build, the necessary includes are not in the bash script (although, in the future they will be)
As of right now, it is necessary to run the following commands to install the necessary packages:
- sudo apt-get install python3-pip
- sudo pip install opencv-contrib-python
- sudo apt-get -y install curl && curl -sL https://dtcooper.github.io/raspotify/install.sh | sh
- pip install spotipy
- sudo apt-get install libsfml-dev


Open terminal, navigate to testing directory.
Give permissions to modern_jukebox3.sh using: chmod +x modern_jukebox3.sh
run modern_jukebox3.sh using: ./modern_jukebox3.sh

Once run, this will envoke the queue_handling2.py, spotify_play2.py, and main2.cpp 

The queue_handling2 works on a timeout of the current song duration. At start, if it is the first song, these temporary files will be populated with the current song data. 
The script also will populate the current_sleep.txt with the duration of the current song playing. This will then loop and update these files every current_sleep amount of time.

The script also calls the main2.cpp (SFML) script which will show the current song's album cover and update it after every song is finished.

The spotify_play.py will start playback on the raspberry pi with the song that is currently stored in the current_song.txt file at the time it is called. 

All of these scripts update after each song is finished by using the duration that was placed in the current_sleep.txt file. 

Once the script is started, that is all that needs to be done as of now. 

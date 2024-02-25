# Hardware Source Files

## Iteration 1: ESP32 (depricated)
ESP32 Setup Git Repository Link: https://github.com/blake-budd1/esp32_setup

At the current present, we have the code we have been working on so far stored either locally or in the ESP32 SetUp Git Repository. We have so far managed to enable our device to connect as well as have figured out how to allow our device to generate its own wifi connection. Additionally, we have set up the initial connection between the ESP32 and the TFT display we currently have using LVGL. At the present, we are able to run the demo images currently available that has been provided to us. 

 Current, existing bugs deal with implementing our own images with the TFT display. 

## Iteration 2: Raspberry Pi 4B (current) [Current RasberryPi code can also be found at https://github.com/blake-budd1/pySetup]
In order to setup the raspberry pi 4b to run the script properly, the following commands must be ran to install the necessary libraries:
- sudo apt-get update
- sudo apt-get upgrade
- sudo apt-get install python3-dev python3-pip
- sudo apt-get -y install curl && curl -sL https://dtcooper.github.io/raspotify/install.sh | sh
- sudo pip install spotipy
- sudo pip install opencv-contrib-python
- sudo pip install requests
- sudo apt-get cec-utils
- sudo apt-get xdotools

Once this is done, run the following command:
- sudo nano /home/{user}/.bashrc
  
Go to the end of the file, and add the following lines of code to run the script on startup:
echo <messsage>
- sudo python {path to python script}/{script name}

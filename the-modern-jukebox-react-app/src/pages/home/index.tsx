import React, { useEffect, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import jukebox from "../../assets/images/jukebox.png";
import jukeboxTitle from "../../assets/images/jukeboxTitle.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import { loginURL } from "../../hooks/spotify";
import Popup from "reactjs-popup";
import { addNewSession, getSessions } from "../../services/SessionsPostService";
import { Session } from "../../types";


function Home () {
  const [token, setToken] = useState("");
  const [sessionCode, setSessionCode] = useState(''); 
  let [loginType, setLoginType] = useState("");
  useEffect(()=>{
    const hash:string = window.location.hash
    let loginType = window.sessionStorage.getItem("loginType")
    let token = window.sessionStorage.getItem("token")
    let id = window.sessionStorage.getItem("code")
    if(!token && hash && id){
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1] ?? ""
        window.location.hash = ""
        sessionStorage.setItem("token",token)
        setToken(token)
        console.log("id", id)
        console.log("token",token)
        if (token != "") {
          loginType= "spotify"
          setLoginType(loginType)
          sessionStorage.setItem("loginType",loginType)
        }
        const sessionObject: Session = {
          session_id: id,
          token: token,
        }
        addNewSession(sessionObject);
    }
},[])

  function generateSessionCode(): number {
    const min = 10000;
    const max = 99999; 
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function handleCreateSession() {
    const code = generateSessionCode();
    console.log(code);
    sessionStorage.setItem("code",code.toString());
    window.location.href = loginURL;
  }

  const handleJoinSession = async () => {
    if (sessionCode.length === 5) {
      const sessionData = await getSessions();
      console.log("Returned From Session", sessionData);
      sessionData.forEach((session) => {
        console.log('Session ID:', session.session_id);
        console.log('Start Time:', session.token);
        if (session.session_id == sessionCode){
          window.sessionStorage.setItem("token", session.token);
          window.sessionStorage.setItem("loginType", "shazam");
          window.sessionStorage.setItem("code", sessionCode);
          window.location.href = `${window.location.origin}/home`;
          console.log("successful");
          setIsPopupOpen(false);
        }
      });
      if (isPopupOpen){
        console.log("unsuccessful");
      }
    //loginType= "shazam";
    //setLoginType(loginType)
    //sessionStorage.setItem("loginType",loginType)
    //window.location.href = `${window.location.origin}/home`;
    //console.log("login type", loginType)
    }
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section id="home" className="gap-16 bg-primary-100 py-10 md:h-full md:w-full md:pb-0">
      <div className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6">
        <div className="z-10 mt-32 md:basis-full">
          <div className="container py-10 mx-0 min-w-full flex flex-col items-center">
            <div className="relative">
                <img alt="title" src={jukeboxTitle} />
            </div>
            <p className="mt-8 text-md text-center">
              Our Web App allows you to connect to our Modern Jukebox device, where you and your friends
              can select and queue songs to be played on the device. Start a session with Spotify or 
              join an existing session to get started.
            </p>
            {window.sessionStorage.getItem("loginType")===null &&
              <div className="flex mt-8 justify-center">
                <button className="mr-4 rounded-md bg-primary-500 px-2 py-2 hover:bg-primary-700 md:mr-16"
                  onClick={(event) => {
                  handleCreateSession();
                }}>
                  Create session
                </button>
                <button className="rounded-md bg-primary-500 px-4 py-2 hover:bg-primary-700"
                onClick={() => setIsPopupOpen(true)}>Join Session</button>
                <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} modal nested>
                    <div className="flex flex-col justify-center items-center" style={{
                      background: 'white',
                      padding: '2rem',
                      borderRadius: '1rem',
                      color: 'black',
                    }}>
                      <div className="py-4 px-0">
                        <label>
                          Enter 5-digit Session ID:
                        </label>
                      </div>
                      <div className="py-8 px-0">
                        <input
                          type='text'
                          maxLength={5}
                          value={sessionCode}
                          onChange={(e) => setSessionCode(e.target.value)}
                          style={{
                            backgroundColor:'black',
                            color:'white',
                            blockSize: '100px',
                            textAlign: 'center',
                            fontSize: 'xxx-large',
                          }}
                        />
                      </div>
                      <div className="py-4 px-0 justify-self-center">
                        <button className=" rounded-md bg-primary-500 px-4 py-2 justify-self-center hover:bg-primary-700" onClick={handleJoinSession}>Submit</button>
                      </div>
                    </div>
                </Popup>
              </div>
            }
          </div>
        </div>
        <div className="flex basis-full justify-center md:z-10 md:ml-16 md:mt-32 md:justify-items-end">
          <img alt="jukebox" src={jukebox} />
        </div>
      </div>
    </section>
  );
};

export default Home;
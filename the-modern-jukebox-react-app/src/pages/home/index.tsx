import React, { useEffect, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import jukebox from "../../assets/images/jukebox.png";
import jukeboxTitle from "../../assets/images/jukeboxTitle.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import { loginURL } from "../../hooks/spotify";

function Home () {
  const [token, setToken] = useState(""); 
  let [loginType, setLoginType] = useState("");
  useEffect(()=>{
    const hash:string = window.location.hash
    let loginType = window.sessionStorage.getItem("loginType")
    let token = window.sessionStorage.getItem("token")
    if(!token && hash){
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1] ?? ""
        window.location.hash = ""
        sessionStorage.setItem("token",token)
        setToken(token)
        console.log("token",token)
        loginType = "spotify"
    }
},[])
  function handleCreateSession() {
    loginType= "spotify";
    setLoginType(loginType)
    sessionStorage.setItem("loginType",loginType)
    window.location.href = loginURL;
    console.log("login type", loginType)
  }

  function handleJoinSession() {
    loginType= "shazam";
    setLoginType(loginType)
    sessionStorage.setItem("loginType",loginType)
    window.location.href = `${window.location.origin}/home`;
    console.log("login type", loginType)
  }

  return (
    <section id="home" className="gap-16 bg-primary-100 py-10 md:h-full md:pb-0">
      
      <div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
      >
        <div className="z-10 mt-32 md:basis-full">
          <div
            className="container py-10 px-1 mx-0 min-w-full flex flex-col items-center"
          >
            <div className="relative">
                <img alt="title" src={jukeboxTitle} />
            </div>
            <p className="mt-8 text-md text-center">
              Our Web App allows you to connect to our Modern Jukebox device, where you and your friends
              can select and queue songs to be played on the device. Explore our pages below, or login to get started.
            </p>
            {window.sessionStorage.getItem("loginType")===null &&
            <div className="mt-8 items-center">
            <button className="mr-16 rounded-md bg-primary-500 px-2 py-2 hover:bg-primary-700 items-center"
            onClick={(event) => {
              handleCreateSession();
            }}>
              Create a session
            </button>
            <button className="mr-16 rounded-md bg-primary-500 px-4 py-2 hover:bg-primary-700 items-center"
            onClick={(event) => {
              handleJoinSession();
            }}>
              Join a session
            </button>
            </div>
            }
            </div>
        </div>

        {/* IMAGE */}
        <div
          className="flex basis-full justify-center md:z-10
              md:ml-16 md:mt-32 md:justify-items-end"
        >
          <img alt="jukebox" src={jukebox} />
        </div>
      </div>
    </section>
  );
};

export default Home;
import React, { useEffect, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import jukebox from "../../assets/images/jukebox.png";
import jukeboxTitle from "../../assets/images/jukeboxTitle.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";

function Home () {
  const [token, setToken] = useState(""); 
  useEffect(()=>{
    const hash:string = window.location.hash
    let token = window.sessionStorage.getItem("token")
    if(!token && hash){
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1] ?? ""
        window.location.hash = ""
        sessionStorage.setItem("token",token)
        setToken(token)
        console.log("token",token)
    }
},[])
  return (
    <section id="home" className="gap-16 bg-primary-100 py-10 md:h-full md:pb-0">
      
      <div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
      >
        {/* MAIN HEADER */}
        <div className="z-10 mt-32 md:basis-full">
          {/* HEADINGS */}
          <div
            className="md:-mt-20"
          >
            <div className="relative">
                {/*
              <div className="before:absolute before:-top-20 before:-left-20 before:z-[-1] md:before:content-evolvetext">
                <img alt="home-page-text" src={HomePageText} />
              </div>
                */}
                <img alt="title" src={jukeboxTitle} />
            </div>

            <p className="mt-8 text-md text-center">
              Our Web App allows you to connect to our Modern Jukebox device, where you and your friends
              can select and queue songs to be played on the device. Explore our pages below, or login to get started.
            </p>
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
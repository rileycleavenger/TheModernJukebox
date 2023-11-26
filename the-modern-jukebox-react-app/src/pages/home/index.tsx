import React, { useEffect, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { SelectedPage } from "../../assets/variables/availablepages";
import jukebox from "../../assets/images/jukebox.png";
import jukeboxTitle from "../../assets/images/jukeboxTitle.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const Home = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
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
      {/* IMAGE AND MAIN HEADER */}
      <motion.div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
      >
        {/* MAIN HEADER */}
        <div className="z-10 mt-32 md:basis-full">
          {/* HEADINGS */}
          <motion.div
            className="md:-mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
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
          </motion.div>

        </div>

        {/* IMAGE */}
        <div
          className="flex basis-full justify-center md:z-10
              md:ml-16 md:mt-32 md:justify-items-end"
        >
          <img alt="jukebox" src={jukebox} />
        </div>
      </motion.div>
    </section>
  );
};

export default Home;
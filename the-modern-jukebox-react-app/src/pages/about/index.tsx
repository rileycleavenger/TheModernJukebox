import React, { useEffect } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { SelectedPage } from '../../assets/variables/availablepages';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import { SparklesIcon } from '@heroicons/react/24/solid';

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const About = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
   useEffect(() => {
    if (isAboveMediumScreens) {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  } 
  }, []);
  return (
    <section id="about" className="gap-16 bg-primary-100 py-10 md:h-full md:pb-0">
      {/* IMAGE AND MAIN HEADER */}
      <motion.div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
        onViewportEnter={() => setSelectedPage(SelectedPage.About)}
      >
        {/* MAIN HEADER */}
        <div className="z-10 mt-32 md:basis-3/5">
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
            <div className="flex items-center gap-8">
              <SparklesIcon className="h-6 w-6 text-white" />
              <p className="text-lg">
                About the Project
              </p>
              <SparklesIcon className="h-6 w-6 text-white" />
            </div>
            <p className="mt-8 text-md">
              The purpose of this project is to give users the ability to collaboratively share music
              by providing access to their personal music libraries within the same device.
              The Music Player page allows logged in users to search for songs and add them to the queue.
              The Queue page allows logged in users to see the queue and clear it, if necessary.
              Developers: Blake Budd, Riley Cleavenger, Alexa Cole, Rafaela Ferreira, and Robert Noble
            </p>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

export default About;

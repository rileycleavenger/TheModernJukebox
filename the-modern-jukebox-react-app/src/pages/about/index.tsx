import React, { useEffect } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import { SparklesIcon } from '@heroicons/react/24/solid';


function About () {
  return (
    <section id="about" className="gap-16 bg-primary-100 py-10 md:h-full md:pb-0"
    >
      <div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
      >
        <div className="z-10 mt-32 md:basis-3/5"
        >
          <div
            className="md:-mt-4" 
          >
            <div className="flex items-center gap-8"
            >
              <SparklesIcon className="h-6 w-6 text-white"
               />
              <p className="text-lg"
              >
                About the Project
              </p>
              <SparklesIcon className="h-6 w-6 text-white" 
              />
            </div>
            <p className="mt-8 text-md"
            >
              The purpose of this project is to give users the ability to collaboratively share music
              by providing access to their personal music libraries within the same device.
              The Music Player page allows logged in users to search for songs and add them to the queue.
              The Queue page allows logged in users to see the queue and clear it, if necessary.
            </p>
            <p className="mt-8 text-md">
              Developers: Blake Budd, Riley Cleavenger, Alexa Cole, Rafaela Ferreira, and Robert Noble
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;

import React from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { SelectedPage } from '../../assets/variables/availablepages';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import HttpListener from './components/HttpListener/HttpListener';
type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const ConnectDevice = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  return (
    <section id="connectdevice" className="gap-16 bg-primary-100 py-10 md:h-full md:pb-0">
      {/* IMAGE AND MAIN HEADER */}
      <motion.div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
        onViewportEnter={() => setSelectedPage(SelectedPage.ConnectDevice)}
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
            <div className="relative">
            <p className="text-lg">
              The Device Connection page allows you to add messages that will be viewed
              in everyone's screen and they will also be shared with our Modern Jukebox device.
            </p>
            </div>
            <div className="mt-24">
              <HttpListener />
            </div>  
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

export default ConnectDevice;
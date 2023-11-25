import React from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { SelectedPage } from '../../assets/variables/availablepages';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const ConnectDevice = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  return (
    <section id="connectdevice" className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0">
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
              <div className="mt-8 text-lg">
                Welcome to the Modern Jukebox
              </div>
            </div>

            <p className="mt-8 text-sm">
            This is the device connection page!
            </p>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

export default ConnectDevice;
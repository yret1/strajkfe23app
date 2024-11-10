"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface NavProps {
  resetBooking: () => void;
}
const Nav: React.FC<NavProps> = ({ resetBooking }) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleNavigate = () => {
    setOpen(!open);
    resetBooking();
  };

  return (
    <section className="w-screen p-2 sticky top-0 left-0 flex justify-start items-center z-50">
      <button
        className="bg-cta bg-opacity-15 flex sticky top-5 left-5 z-50 justify-center items-start flex-col gap-2 p-3 rounded-md"
        onClick={() => setOpen(!open)}
      >
        <hr className="w-6 border-[1px] border-cta rounded-md" />
        <hr className="w-4 border-[1px] border-cta rounded-md" />
        <hr className="w-2 border-[1px] border-cta rounded-md" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute z-40 top-0 left-0 bg-[#1C1919] w-screen h-screen flex flex-col justify-center items-center gap-4"
          >
            <p
              onClick={toggleNavigate}
              className="beba text-cta text-6xl tracking-wide"
            >
              BOOKING
            </p>
            <p
              onClick={toggleNavigate}
              className="beba text-cta text-6xl tracking-wide"
            >
              CONFIRMATION
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Nav;

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Loading = () => {
  const string = "BOWLING";

  const splitString = string.split("");
  return (
    <section className="w-screen h-screen flex justify-center text-center items-center gap-4 flex-col">
      <Image
        src="/Logo.svg"
        alt="Logo"
        width={110}
        priority
        height={200}
        className="w-auto h-auto"
      />

      <div className="w-full p-6 flex flex-col justify-center items-center text-center">
        <h1 className="text-cta text-8xl beba font-normal tracking-wide">
          STRAJK
        </h1>
        <div className="work text-center text-headers font-normal tracking-widest text-3xl mb-2">
          {splitString.map((char, index) => (
            <motion.span
              className="inline-block"
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 1,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: index * 0.1,
                },
              }}
              key={index + char}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Loading;

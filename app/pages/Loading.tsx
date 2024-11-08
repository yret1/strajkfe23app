import Image from "next/image";

const Loading = () => {
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
        <p className="work text-center text-headers font-normal tracking-widest text-3xl">
          BOWLING
        </p>
      </div>
    </section>
  );
};

export default Loading;

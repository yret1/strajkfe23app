"use client";

import { useState } from "react";
import { Booking, Bookingresponse } from "./interfaces/interface";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(true);
  const [booking, setBooking] = useState<Booking>({
    when: "",
    lanes: 0,
    people: 0,
    shoes: [],
  });

  const [bookingResponse, setBookingResponse] = useState<Bookingresponse>({
    when: "",
    lanes: 0,
    people: 0,
    shoes: [],
    price: 0,
    id: "",
    active: true,
  });

  const sendRequest = async () => {
    if (
      booking.when !== "" &&
      booking.lanes !== 0 &&
      booking.people !== 0 &&
      booking.shoes.length !== 0
    ) {
      if (booking.people == booking.shoes.length) {
        setLoading(true);
        try {
          const response = await fetch("/api/reqbooking", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              when: booking.when,
              lanes: booking.lanes,
              people: booking.people,
              shoes: booking.shoes,
            }),
          });
          const data = await response.json();
          setLoading(false);
          setBookingConfirmed(true);
          setBookingResponse(data as Bookingresponse);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setBookingConfirmed(false);
        }
      }
    } else {
      alert("Invalid booking, make sure you have filled in all fields");
    }
  };

  return (
    <section className="w-screen min-h-screen bg-background">
      {loading && (
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
      )}

      {!loading && !bookingResponse.active && !bookingConfirmed && (
        <section className="w-screen min-h-screen p-6 flex flex-col">
          <section className="w-full flex flex-col justify-center items-center gap-2">
            <Image
              src="/Logo.svg"
              alt="Logo"
              width={110}
              priority
              height={200}
              className="w-3/12 h-auto"
            />
            <p className="beba text-6xl text-cta font-normal tracking-wider">
              BOOKING
            </p>
          </section>

          <section className="w-full flex justify-center items-center gap-2">
            <hr className="w-full bg-transparent border-[1px] border-headers h-px" />
            <p className="beba text-headers text-lg text-nowrap">
              WHEN, WHAT & WHO
            </p>
            <hr className="w-full bg-transparent border-[1px] border-headers h-px" />
          </section>

          <section className="w-full flex flex-col justify-center items-center gap-4">
            <fieldset className="w-full flex gap-4 py-4">
              <div className="form-group">
                <select
                  id="date"
                  className="input-field border-2 rounded-md border-headers bg-background text-inputtext text-xl work"
                />
                <label htmlFor="date" className="input-label text-headers work">
                  DATE
                </label>
              </div>
              <div className="form-group">
                <select
                  id="Time"
                  className="input-field border-2 rounded-md border-headers bg-background text-inputtext text-xl work"
                >
                  <option value="">When</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                </select>
                <label htmlFor="Time" className="input-label text-headers work">
                  TIME
                </label>
              </div>
            </fieldset>

            <fieldset className="w-full flex gap-4 py-4">
              <div className="form-group">
                <select
                  id="people"
                  onChange={(e) =>
                    setBooking({
                      ...booking,
                      people: parseInt(e.currentTarget.value),
                    })
                  }
                  className="input-field border-2 rounded-md border-headers bg-background text-inputtext text-xl work"
                >
                  <option value="">-- How many people? --</option>
                  <option value="1">1 Bowler</option>
                  <option value="2">2 Bowlers</option>
                  <option value="3">3 Bowlers</option>
                  <option value="4">4 Bowlers</option>
                  <option value="5">5 Bowlers</option>
                  <option value="6">6 Bowlers</option>
                  <option value="7">7 Bowlers</option>
                  <option value="8">8 Bowlers</option>
                  <option value="9">9 Bowlers</option>
                  <option value="10">10 Bowlers</option>
                  <option value="11">11 Bowlers</option>
                  <option value="12">12 Bowlers</option>
                  <option value="13">13 Bowlers</option>
                  <option value="14">14 Bowlers</option>
                  <option value="15">15 Bowlers</option>
                  <option value="16">16 Bowlers</option>
                  <option value="17">17 Bowlers</option>
                  <option value="18">18 Bowlers</option>
                  <option value="19">19 Bowlers</option>
                  <option value="20">20 Bowlers</option>
                </select>
                <label
                  htmlFor="people"
                  className="input-label text-headers work"
                >
                  Number of awesome bowlers
                </label>
              </div>
            </fieldset>
            <fieldset className="w-full flex gap-4 py-4">
              <div className="form-group">
                <select
                  id="lanes"
                  className="input-field border-2 rounded-md border-headers bg-background text-inputtext text-xl work"
                >
                  <option value="-- Please Select Lanes --">
                    -- Please Select Lanes --
                  </option>
                  <option value="1">1 Lane</option>
                  <option value="2">2 Lanes</option>
                  <option value="3">3 Lanes</option>
                  <option value="4">4 Lanes</option>
                  <option value="5">5 Lanes</option>
                </select>

                <label
                  htmlFor="lanes"
                  className="input-label text-headers work"
                >
                  Number of Lanes
                </label>
              </div>
            </fieldset>
          </section>
          <AnimatePresence>
            {booking.people > 0 && (
              <motion.section
                layout
                className="w-full"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
              >
                <section className="w-full flex justify-center items-center gap-2">
                  <hr className="w-full bg-transparent border-[1px] border-headers h-px" />
                  <p className="beba text-headers text-lg text-nowrap">SHOES</p>
                  <hr className="w-full bg-transparent border-[1px] border-headers h-px" />
                </section>

                <section className="w-full flex flex-col justify-start items-start gap-4 py-4">
                  {Array.from({ length: booking.people }).map((_, index) => {
                    return (
                      <fieldset key={"Shoe" + index} className="w-full">
                        <div className="form-group">
                          <select
                            id="shoe"
                            className="input-field border-2 rounded-md border-headers bg-background text-inputtext text-xl work"
                          >
                            <option value="30"> EURO 30</option>
                            <option value="31"> EURO 31</option>
                            <option value="32"> EURO 32</option>
                            <option value="33"> EURO 33</option>
                            <option value="34"> EURO 34</option>
                            <option value="35"> EURO 35</option>
                            <option value="36"> EURO 36</option>
                            <option value="37"> EURO 37</option>
                            <option value="38"> EURO 38</option>
                            <option value="39"> EURO 39</option>
                            <option value="40"> EURO 40</option>
                            <option value="41"> EURO 41</option>
                            <option value="42"> EURO 42</option>
                            <option value="43"> EURO 43</option>
                            <option value="44"> EURO 44</option>
                            <option value="45"> EURO 45</option>
                          </select>
                          <label
                            htmlFor="shoe"
                            className="input-label text-headers work"
                          >
                            SHOE SIZE / PERSON {index + 1}
                          </label>
                        </div>
                      </fieldset>
                    );
                  })}
                </section>
              </motion.section>
            )}
          </AnimatePresence>

          <motion.button
            onClick={sendRequest}
            className="text-white bg-cta border-cta rounded-md w-full beba font-bold py-5 px-5 text-3xl"
          >
            STRIIIIIIKE!
          </motion.button>
        </section>
      )}

      {!loading && bookingResponse.active && bookingConfirmed && (
        <section className="w-full p-6">
          <section className="w-full flex flex-col justify-center items-center gap-2 my-6">
            <Image
              src="/Logo.svg"
              alt="Logo"
              width={110}
              priority
              height={200}
              className="w-3/12 h-auto"
            />
            <p className="beba text-6xl text-cta font-normal tracking-wider">
              SEE YOU SOON!
            </p>
          </section>

          <section className="w-full flex justify-center items-center gap-2">
            <hr className="w-full bg-transparent border-[1px] border-headers h-px" />
            <p className="beba text-headers text-lg text-nowrap">
              BOOKING DETAILS
            </p>
            <hr className="w-full bg-transparent border-[1px] border-headers h-px" />
          </section>

          <section className="w-full flex flex-col gap-5 py-10">
            <div className="form-group">
              <section className="input-field border-[1px] rounded-md border-headers bg-background text-inputtext text-xl work">
                <option value={bookingResponse.when}>
                  {bookingResponse.when}
                </option>
              </section>

              <label htmlFor="lanes" className="input-label text-headers work">
                WHEN
              </label>
            </div>
            <div className="form-group">
              <section className="input-field border-[1px] rounded-md border-headers bg-background text-inputtext text-xl work">
                <option value={bookingResponse.people}>
                  {bookingResponse.people} Bowlers
                </option>
              </section>

              <label htmlFor="lanes" className="input-label text-headers work">
                WHO
              </label>
            </div>
            <div className="form-group">
              <section className="input-field border-[1px] rounded-md border-headers bg-background text-inputtext text-xl work">
                <option value={bookingResponse.lanes}>
                  {bookingResponse.lanes} Lanes
                </option>
              </section>

              <label htmlFor="lanes" className="input-label text-headers work">
                LANES
              </label>
            </div>
            <div className="form-group">
              <section className="input-field border-[1px] rounded-md border-headers bg-background text-inputtext text-xl work">
                <option value={bookingResponse.id}>{bookingResponse.id}</option>
              </section>

              <label className="input-label text-headers work">
                BOOKING NUMBER
              </label>
            </div>
          </section>

          <section className="pt-16 flex flex-col gap-2">
            <section className="flex justify-between items-center p-6 border-cta border-[1px] rounded-md">
              <p className="work text-cta font-bold">total</p>
              <p className="work text-cta">{bookingResponse.price + " SEK"}</p>
            </section>
            <motion.button
              onClick={sendRequest}
              className="text-white bg-cta border-cta rounded-md w-full beba font-bold py-5 px-5 text-3xl"
            >
              SWEET, LETS GO!
            </motion.button>
          </section>
        </section>
      )}
    </section>
  );
}

"use client";

import { useState } from "react";
import { Booking, Bookingresponse } from "./interfaces/interface";
import Loading from "./pages/Loading";
import Bookingpage from "./pages/Booking";
import ConfirmedBooking from "./pages/ConfirmedBooking";

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

  const resetBooking = () => {
    setBooking({
      when: "",
      lanes: 0,
      people: 0,
      shoes: [],
    });
    setBookingConfirmed(false);
    setBookingResponse({
      when: "",
      lanes: 0,
      people: 0,
      shoes: [],
      price: 0,
      id: "",
      active: false,
    });
  };

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
      {loading && <Loading />}

      {!loading && !bookingResponse.active && !bookingConfirmed && (
        <Bookingpage
          Booking={booking}
          setBooking={setBooking}
          sendRequest={sendRequest}
        />
      )}

      {!loading && bookingResponse.active && bookingConfirmed && (
        <ConfirmedBooking
          bookingResponse={bookingResponse}
          resetBooking={resetBooking}
        />
      )}
    </section>
  );
}

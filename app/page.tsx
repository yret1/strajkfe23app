"use client";

import { useEffect, useState } from "react";
import { Booking, Bookingresponse } from "./interfaces/interface";
import Loading from "./pages/Loading";
import Bookingpage from "./pages/Booking";
import ConfirmedBooking from "./pages/ConfirmedBooking";
import Nav from "./pages/comps/Nav";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [dates, setDates] = useState<{ label: string; value: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [times, setTimes] = useState<string[]>([]);

  const [laneError, setLaneError] = useState<boolean>(false);
  const [peopleError, setPeopleError] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    //Generate dates for booking. Generates 10 days from current date
    const generateDates = () => {
      const currentDate = new Date();
      const dateArray = [];

      for (let i = 0; i < 10; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);

        const formattedDate = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        });

        dateArray.push({
          label: formattedDate,
          value: date.toISOString().split("T")[0],
        });
      }

      console.log(dateArray);
      return dateArray;
    };

    setDates(generateDates());
  }, []);

  useEffect(() => {
    //Generate times for booking based on opening hours and current time
    const generateTimes = () => {
      const openingHour = 9;
      const closingHour = 21;
      const currentTime = new Date();

      const currentDateString = currentTime.toISOString().split("T")[0];
      const currentHour = currentTime.getHours();

      const selectedDateString = new Date(selectedDate)
        .toISOString()
        .split("T")[0];

      const timeArray = [];
      const isToday = selectedDateString === currentDateString;

      for (let hour = openingHour; hour <= closingHour; hour++) {
        if (!isToday || hour > currentHour) {
          const formattedTime = `${hour.toString().padStart(2, "0")}:00`;
          timeArray.push(formattedTime);
        }
      }
      return timeArray;
    };

    if (selectedDate) {
      setTimes(generateTimes());
    }
  }, [selectedDate]);

  // Combine time and date
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const formattedDateTime = `${selectedDate}T${selectedTime}`;

      setBooking((prevBookin) => ({ ...prevBookin, when: formattedDateTime }));
    }
  }, [selectedDate, selectedTime]);

  //Booking for request
  const [booking, setBooking] = useState<Booking>({
    when: "",
    lanes: 0,
    people: 0,
    shoes: [],
  });

  //Booking confirmation response
  const [bookingResponse, setBookingResponse] = useState<Bookingresponse>({
    when: "",
    lanes: 0,
    people: 0,
    shoes: [],
    price: 0,
    id: "",
    active: false,
  });

  useEffect(() => {
    //Make sure conditions for lanebooking are met.

    const peoplePerLane = booking.people / booking.lanes;

    if (peoplePerLane < 1) {
      setLaneError(true);
      setPeopleError(false);
    } else if (peoplePerLane > 4) {
      setPeopleError(true);
      setLaneError(false);
    } else if (booking.lanes > booking.people) {
      setPeopleError(true);
      setLaneError(false);
    } else {
      setLaneError(false);
      setPeopleError(false);
    }
  }, [booking]);

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
      if (
        booking.people == booking.shoes.length &&
        !laneError &&
        !peopleError
      ) {
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
      {!loading && <Nav resetBooking={resetBooking} />}
      {loading && <Loading />}

      {!loading && !bookingResponse.active && !bookingConfirmed && (
        <Bookingpage
          Booking={booking}
          setBooking={setBooking}
          sendRequest={sendRequest}
          dates={dates}
          times={times}
          setSelectedDate={setSelectedDate}
          setSelectedTime={setSelectedTime}
          laneError={laneError}
          peopleError={peopleError}
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

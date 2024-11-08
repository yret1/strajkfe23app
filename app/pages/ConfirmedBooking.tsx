import Image from "next/image";
import { Bookingresponse } from "../interfaces/interface";
import { motion } from "framer-motion";

interface Bookingconfirmedprops {
  bookingResponse: Bookingresponse;
  resetBooking: () => void;
}

const ConfirmedBooking: React.FC<Bookingconfirmedprops> = ({
  bookingResponse,
  resetBooking,
}) => {
  return (
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
        <p className="beba text-headers text-lg text-nowrap">BOOKING DETAILS</p>
        <hr className="w-full bg-transparent border-[1px] border-headers h-px" />
      </section>

      <section className="w-full flex flex-col gap-5 py-10">
        <div className="form-group">
          <section className="input-field border-[1px] rounded-md border-headers bg-background text-inputtext text-xl work">
            <option value={bookingResponse.when}>{bookingResponse.when}</option>
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
          onClick={resetBooking}
          className="text-white bg-cta border-cta rounded-md w-full beba font-bold py-5 px-5 text-3xl"
        >
          SWEET, LETS GO!
        </motion.button>
      </section>
    </section>
  );
};

export default ConfirmedBooking;

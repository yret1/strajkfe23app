interface Errorprops {
  laneError?: boolean;
  peopleError?: boolean;
}
const Errordisp: React.FC<Errorprops> = ({ laneError, peopleError }) => {
  let text = "";

  switch (true) {
    case laneError:
      text = "At least 1 person per lane.";
      break;
    case peopleError:
      text = "Max 4 people per booked lane.";
      break;
  }

  return (
    <section className="w-full rounded-md bg-cta text-white work p-5 error mb-4">
      {text}
    </section>
  );
};

export default Errordisp;

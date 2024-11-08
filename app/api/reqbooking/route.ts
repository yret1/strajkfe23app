import { Booking, Bookingresponse } from "@/app/interfaces/interface";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  const reqbody: Booking = await req.json();

  const { when, lanes, people, shoes } = reqbody;

  try {
    if (when !== "" && lanes !== 0 && people !== 0 && shoes.length == people) {
      if (lanes / people < 0.25) {
        return Response.json({ message: "Max 4 spelare per bana!" });
      }

      const response = await fetch(
        "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "738c6b9d-24cf-47c3-b688-f4f4c5747662",
          },
          body: JSON.stringify({ when, lanes, people, shoes }),
        }
      );
      const data = await response.json();

      console.log("Response", data);
      const booking = data as unknown as Bookingresponse;
      return Response.json(booking as Bookingresponse);
    } else {
      return Response.json({ message: "Invalid booking" });
    }
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Error", error });
  }
}

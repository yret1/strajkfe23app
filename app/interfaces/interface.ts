export interface Booking {
  when: string;
  lanes: number;
  people: number;
  shoes: number[];
}

export interface Bookingresponse {
  when: string;
  lanes: number;
  people: number;
  shoes: number[];
  price: number;
  id: string;
  active: boolean;
}

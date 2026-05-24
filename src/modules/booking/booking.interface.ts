export interface IBooking {
  id?: number;
  user_id: number;
  title: string;
  description?: string;
  booking_date: Date | string;
  status?: "pending" | "confirmed" | "cancelled";
  created_at?: Date;
  updated_at?: Date;
}

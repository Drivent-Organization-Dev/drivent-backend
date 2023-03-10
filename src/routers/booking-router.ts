import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { bookingRoom, listBooking, changeBooking, listBookedRooms } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("", listBooking)
  .get("/:hotelId", listBookedRooms)
  .post("", bookingRoom)
  .put("/:bookingId", changeBooking);

export { bookingRouter };

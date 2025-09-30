import {model, models, Schema} from "mongoose";

const BookingSchema = new Schema({
    passengerName: { type: String, required: true},
    routeId: { type: String, required: true}
})

const Booking = models.Booking || model("Booking", BookingSchema)

export default Booking
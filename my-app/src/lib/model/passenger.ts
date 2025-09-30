import {model, models, Schema} from "mongoose";

const PassengerSchema = new Schema({
    passengerName: { type: String, required: true},
    email: { type: String, required: true}
})

const Passenger = models.Passenger || model("Passenger", PassengerSchema)

export default Passenger
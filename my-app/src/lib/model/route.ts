import {Schema, models, model} from "mongoose";

const RouteSchema = new Schema({
    origin : { type: String, required: true},
    destination : { type: String, required: true},
    departureTime : { type: Date, required: true},
    availableSeats : { type: String, required: true},
})

const Route = models.Route || model('Route', RouteSchema);

export default Route;

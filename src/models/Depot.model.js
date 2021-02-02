import mongoose from "mongoose";
import mongooseConnect from "../utils/mongooseConnect";

mongooseConnect(mongoose, "Depot");

/**
 * The schema for depot objects
 *
 * @property {string} name The name of the depot
 * @property {number} drivers The number of drivers assigned to the depot
 * @property {boolean} [hidden=false] Whether or not the depot is hidden.
 * Hidden depots will only appear in the frontend app if it is in a
 * development environment (determined by the "NODE_ENV" environment variable)
 */
const depotSchema = new mongoose.Schema({
	"name": { "type": String, "required": true, "unique": true },
	"drivers": { "type": Number, "required": true },
	"hidden": { "type": Boolean, "default": false },
});

export default mongoose.model("depot", depotSchema);

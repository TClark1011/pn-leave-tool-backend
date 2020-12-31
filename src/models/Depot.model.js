import mongoose from "mongoose";
import mongooseConnect from "../utils/mongooseConnect";

mongooseConnect(mongoose, "depot");

const depotSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	drivers: { type: Number, required: true },
	hidden: { type: Boolean, default: false },
});

export default mongoose.model("depot", depotSchema);

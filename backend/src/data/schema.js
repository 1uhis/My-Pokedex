import mongoose from "mongoose";
import { VALID_TYPES } from "./types.js";

const Schema = mongoose.Schema;

const speciesSchema = new Schema({
    dexNumber: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    dexEntry: { type: String, required: true },
    types: {
        type: [String],
        required: true,
        validate: {
            validator: function (types) {
                return types.every(type => VALID_TYPES.includes(type));
            },
            message: props => `${props.value} is not a valid type.`
        }
    }
});

speciesSchema.index({ name: "text", dexEntry: "text" });

const Species = mongoose.model("Species", speciesSchema);

export { Species };

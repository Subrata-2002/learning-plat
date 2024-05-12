// models/goal.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const goalSchema = new Schema({
    name: { type: String, required: true },
});

export default mongoose.model('Goal', goalSchema);

// models/topic.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const topicSchema = new Schema({
    name: { type: String, required: true },
  courseName: { type: String, required: true }, // Add a field to store goal name
});

export default mongoose.model('Topic', topicSchema);

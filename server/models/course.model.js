// models/course.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema({
    name: { type: String, required: true },
    goalName: { type: String, required: true }, // Add a field to store goal name
});

export default  mongoose.model('Course', courseSchema);


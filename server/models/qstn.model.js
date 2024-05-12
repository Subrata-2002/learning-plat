import mongoose from "mongoose";
const { Schema } = mongoose;

const qstnSchema = new Schema({

    qstnname: {
        type: String,
        required: true
    },
    author:{
        type: String,
        default:"author34@"
    },
    topic:{
        type:[String],
       
    }

}, {
    timestamps: true
});
export default mongoose.model("Qstn", qstnSchema);
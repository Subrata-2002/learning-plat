import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
// routes
// import QstnRoute from "./routes/qstnreg.route.js";
import QstnRoute from "./routes/questionreg.route.js";


const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin:'http://localhost:5173',
    // origin:"https://fiverr-nest.netlify.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
     credentials:true ,
}))

dotenv.config();

const connect = async () =>{

    try {
        await mongoose.connect(process.env.MONGO);
        console.log("database connected..")
    } catch (error) {
       console.log(error)
    }
}


app.use("/api",QstnRoute);



app.listen(PORT, () => {
    console.log("Server is running...");
    connect();
})


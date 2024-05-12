import axios from "axios";


const newRequest = axios.create({
    // baseURL:"http://localhost:3000/api",
    baseURL:"https://learning-plat.onrender.com/api/",
    withCredentials:true,
});

export default newRequest;
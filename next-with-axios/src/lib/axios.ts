import axios,{AxiosInstance} from "axios";

const axiosInstance:AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:5000/api/",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    }
});

export default axiosInstance;
import axios from "axios";

const instace = axios.create({
  baseUrlFake: "http://localhost:3000",
});

export default instace
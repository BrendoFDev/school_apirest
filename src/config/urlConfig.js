/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();

export default {
  url: `http://${process.env.APP_URL}:${process.env.APP_PORT}/`
}

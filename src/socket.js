import { io } from "socket.io-client";

const URL = process.env.IO_URL;

export const socket = io(URL);

import cors from "cors";
import express from "express";
import http from "http";
import morgan from "morgan";
import { dirname, join } from "path";
import { Server as SocketServer } from "socket.io";
import { fileURLToPath } from "url";
import { PORT } from "./config.js";

// Creamos una aplicacion de express
const app = express();
// Se convierte a un servido 'http'
const server = http.createServer(app);
// Pasamos por parametro el servidor 'http' al servidor de websocket (socket.io)
const io = new SocketServer(server, {
  // cors: {
  //   origin: "http://localhost:4000",
  // },
});

const __dirname = dirname(fileURLToPath(import.meta.url));

// Middlewares
app.use(cors());
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "../client/dist")));

//  evento de conexion para el servidor de socket
io.on("connection", (socket) => {
  console.log(`ID del cliente conectado: ${socket.id}`);
  console.log(`Un usuario conectado`);

  // este recibe el evento desde el frontal y podemos acceder a los datos junto al identificador desde el socket.emit
  socket.on("message", (message) => {
    console.debug(message);
    console.log(`El cliente con ID ${socket.id} ha enviado el mensaje: ${message.text}`);
    // esto permite enviar a los otros clientes un evento, en este caso una respuesta con un objeto,
    socket.broadcast.emit("message", {
      text: message.text,
      ...message,
    });
  });
});

// servidor 'http' mas el puerto al que se debe conectar
server.listen(PORT);
console.log(`Servidor iniciado en el puerto ${PORT}`);

import { setLocalStorage } from "@/utilities/localstorage.utility";
import { useAuth0 } from "@auth0/auth0-react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Box, IconButton, Paper, Stack, styled, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";

import { setLightMode, useMaterialUIController } from "@/context";

// puente de conexion entre el cliente y el servidor
// const socket = io(import.meta.env.VITE_SOCKET_URL);
const socket = io("/");

// const __botUser = {
//   id: "__bot",
//   nickname: "[Bot]",
//   picture: "https://uptime.com/media/website_profiles/discordbots.org.png",
//   message: "Bienvenido a chat.io",
//   color: "hsla(226, 58%, 80%, 1)",
//   time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
//   permissions: "bot", // 'invited' || 'authenticated'
// };

const __invitedMessage = {
  user: {
    id: crypto.randomUUID(),
    nickname: `Invitado-${crypto.randomUUID().split("-")[1]}`,
    picture: "https://picsum.photos/512/512",
  },
  text: "",
  color: `hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`,
  time: "",
};
setLocalStorage("__invitedMessage", __invitedMessage);

const StyledScrollToBottom = styled(ScrollToBottom)`
  height: 100%;
`;

const ChatSection = () => {
  const [controller, dispatch] = useMaterialUIController();
  const { botMessage } = controller;

  const { user, isAuthenticated, isLoading } = useAuth0();

  const [message, setMessage] = useState(__invitedMessage); // estado inicial
  const [messages, setMessages] = useState([botMessage]); // estado inicial
  const [date, setDate] = useState(new Date());

  const handleChange = (e) => {
    setMessage({ ...message, text: e.target.value });
  };

  const handleSubmit = () => {
    const twoDigitMinutes = date.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessageObj = {
      ...message,
      time: twoDigitMinutes,
    };
    // este recibe un nombre y un valor para enviar al servidor
    socket.emit("message", newMessageObj);
    // desde el cliente enviamos un objeto con las mismas propiedades y lo susmamos al array de mensajes
    setMessages([...messages, newMessageObj]);
    setMessage({ ...message, text: "" });
  };

  useEffect(() => {
    // este evento se refiere al evento que envia el servidor hacia el cliente, no es el mismo que el de arriba
    const receiveMessage = (message) => {
      // console.log(message);
      setMessages([...messages, message]); // desde el cliente enviamos un objeto con las mismas propiedades
    };
    socket.on("message", receiveMessage);

    return () => {
      // cuando el componente se destruye o no existe, se elimina la subscripcion al evento del servidor (al socket)
      socket.off("message", receiveMessage);
    };
  }, [messages]);

  useEffect(() => {
    if (isAuthenticated) {
      const { nickname, picture } = user;

      const loginUser = {
        ...message.user,
        nickname,
        picture,
      };

      setMessage({ ...message, user: loginUser });
    }
  }, [user]);

  return (
    <Box sx={{ height: "100%" }}>
      <Stack justifyContent="flex-end" sx={{ height: "100%" }}>
        <Stack
          sx={{
            py: 1,
            my: 2,
            height: "100%",
            border: "1px solid hsl(0, 0%, 0%)",
            borderColor: "text.primary",

            borderRadius: 2,
          }}
        >
          <StyledScrollToBottom>
            {messages.map((msg, index) => (
              <Stack
                key={index}
                alignItems={msg.user.nickname === message.user.nickname ? "flex-end" : "flex-start"}
                sx={{ px: 2 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    my: 0.5,
                    bgcolor: msg.user.nickname === message.user.nickname ? "primary.main" : "primary.dark",
                    textAlign: msg.user.nickname === message.user.nickname ? "right" : "left",
                    borderRadius: 2,
                  }}
                >
                  <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                    {msg.user.nickname !== message.user.nickname && (
                      <Box
                        component="img"
                        sx={{
                          height: 22,
                          width: 22,
                          my: 1,
                          border: `3px solid ${msg.color}`,
                          borderColor: "primary.main",
                          borderRadius: "100%",
                        }}
                        alt=""
                        src={msg.user.picture}
                      />
                    )}
                    <Typography variant="caption" sx={{ color: msg.color }}>
                      {msg.user.nickname === message.user.nickname ? "" : msg.user.nickname}
                    </Typography>
                  </Stack>

                  <Typography color="text.primary">{msg.text}</Typography>
                  <Typography color="text.primary" variant="caption" sx={{ fontWeight: 300 }}>
                    {msg.time}
                  </Typography>
                </Paper>
              </Stack>
            ))}
          </StyledScrollToBottom>
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="flex-start" alignItems="flex-end" spacing={2}>
        <TextField label="Mensaje" size="small" value={message.text} fullWidth onChange={handleChange} />

        <IconButton aria-label="send-rounded" color="secondary" disabled={!message.text} onClick={handleSubmit}>
          <SendRoundedIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ChatSection;

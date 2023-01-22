# Chat.IO

## Tecnologías y dependencias que se utilizan

### Proyecto `server`

- Express V.4
- Control de CORS
- Morgan (Middleware de registro de solicitudes TTP para node.js)
- Socket.IO ([server API](https://socket.io/docs/v4/server-api/))

### Proyecto `client`

- React V.18
- [Material UI V.5](https://mui.com/material-ui/getting-started/overview/)
  - Tema custom modificando los colores, tipografía, componentes, etc...
  - Tema claro y tema oscuro (por defecto)
- [Auth0](https://auth0.com/docs)
- Socket.IO ([client API](https://socket.io/docs/v4/client-api/))

---

## Ideas para un futuro desarrollo

- Desplegarlo en Vercel u otros servicios.
- Chats privados entre usuarios registrados.
- Sección con los usuarios conectados.
- Portada con animaciones con botones para iniciar con un usuario registrado o como usuario invitado.
- Permitir a los usuarios registrados que se puedan cambiar el apodo/nickname
- Crear un historial de los chats para evitar perder mensajes. A su vez, cargar del historial una cantidad 'X' y la posibilidad de cargar mensajes más antiguos (haciendo scroll o con un boton).
- Mostrar mensajes en el chat global
  - Cuando un usuario invitado se conecta y se desconecta.
  - Cuando un usuario invitado cambia a una cuenta registrada.
  - Cuando un usuario registrado se desconecta.

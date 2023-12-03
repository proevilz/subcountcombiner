import io from "socket.io-client"
const socket = io("https://realtime.streamelements.com", {
  transports: ["websocket"],
})

export default socket

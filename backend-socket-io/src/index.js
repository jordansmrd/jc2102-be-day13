const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config();

const http = require("http")
const server = http.createServer(app)
const {Server} = require("socket.io")

const io = new Server(server, { cors: { origin: "*" } })
global.io = io


const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.get("/", (req,res) => {
    res.send("SOCKET API")
})



let messages = [
    {
      message: "Ini message 1"
    },
    {
      message: "message 2"
    },
    {
      message: "Kalau ini ketiga"
    },
  ]

io.on("connection", (socket) => {
    console.log("user connected")

    socket.emit("INIT_MESSAGES", messages)

    socket.on("my-event", (data) => {
        // console.log("event triggered")
        console.log(data.message + " from " + data.user.name)
    })

    socket.on("SEND_MESSAGES", (data) => {
        messages.push(data)
    socket.emit("INIT_MESSAGES", messages)

    })
})

server.listen(PORT , ()=> {
    console.log("listening in port " + PORT)
})

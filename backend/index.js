require('dotenv').config();
const express =  require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connect');
const {Server} = require('socket.io');

app.use(express.json());
app.use(cors());

//connecting socket.io server with express
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        method:["GET","POST"],
    }
})

const authRouter = require('./routes/auth');
const chatRouter = require('./routes/chat');

const port = process.env.PORT || 3001;

app.use('/api/v1/auth',authRouter);
app.use('/api/v1',chatRouter);

//creating socketio emitters
io.on("connection",(socket)=>{
    console.log(socket.id);

    socket.on("join_room",(data)=>{
        socket.join(data);
    })

    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id);
    })
})

const start = async()=>{
    try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port,console.log(`Server is on ${port}...`))
    }
    catch(error){
        console.log(error);
    }
}

start();
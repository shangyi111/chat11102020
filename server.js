const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname,'public')));
const botName = 'Chatcord Bot';
io.on('connection',socket =>{
	socket.on('joinRoom',({username,room})=>{
		//welcome new user
		socket.emit('message',formatMessage(botName,'Welcome to Chatcord!'));
		socket.broadcast.emit('message','A user has joined the chat.');
		
	})
	
	//Listen for chatMessage
	socket.on('chatMessage',(msg)=>{
		io.emit('message',formatMessage('USER',msg));
	})
	
	socket.on('disconnect',()=>{
		io.emit('message',formatMessage(botName,'A user has left the chat'));
	});

	
})
const PORT = 3000 || process.env.PORT;
server.listen(PORT,()=> console.log(`Server running on port ${PORT}`));

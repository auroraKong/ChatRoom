const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname +　'/index.html');
})
app.use(express.static('static'));

let users = new Set();
let cot = 0;

io.on('connection', function(socket){
	// console.log('a user connected');
	socket.on('disconnect', function(){
	    console.log('user disconnected');
	    users.delete(socket.user);
	    // cot--;
	    cot = cot-1 < 0 ? 0 : cot-1;
	    io.emit('logout', {
	    	user: socket.user,
	    	cot: cot
	    })
	});
	socket.on('add user', function(msg){
		let hint = true;
		// console.log(users);
		if(users.has(msg.user)) hint = false;
		else{
			console.log('new user: ' + msg.user + ' logged');
			socket.user = msg.user;
			users.add(msg.user);
			cot++;
			/**
			// broadcast to every sockets but the sender
			socket.broadcast.emit('new user join', { 
				username: msg
			});
			*/
		}
		io.emit('login', {
			user: msg.user,
			cot: cot,
			hint: hint
		})
	})
	socket.on('chat message', function(msg){
		// console.log('message: ' + msg);
		io.emit('chat message', {
			user: socket.user,
			chat: msg.chat,
			time: msg.time
		});
	})
	
})

http.listen(3000, function(){
	console.log('listening on localhost:3000');
})
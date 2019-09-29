const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

class User {
  constructor(name, socketId) {
    this.name = name;
    this.socketId = socketId;
  }
}

let onlineCount = 0;
let userList = [];
let roomList = [];

server.listen(3000, () => {
  console.log("Server Started. http://localhost:3000");
  io.on('connection', (socket) => {
    console.log('Hello!', socket.id);
    onlineCount++;
    io.emit('refreshOnlineCount', onlineCount);

    socket.on('login', (data) => {
      userList.push(new User(data, socket.id));
      io.emit('userLogin', data);
      io.emit('refreshUserList', userList);
      console.log(userList);
    });

    socket.on('lobbyOnMessage', (data) => {
      socket.broadcast.emit('lobbyOnMessage', data);
    });

    socket.on('roomOnMessage', (data) => {
      let targetRoom = roomList.find((e) => {
        return e.includes(socket.id);
      })
      socket.to(targetRoom).broadcast.emit('roomOnMessage', data);
    });

    socket.on('inviteChat', (data) => {
      let inviteIndex = userList.findIndex((e) => {
        return e.socketId == socket.id;
      });
      let invitedIndex = userList.findIndex((e) => {
        return e.name == data;
      });
      console.log('catch');
      socket.join(socket.id + '_' + userList[invitedIndex].socketId);
      roomList.push(socket.id + '_' + userList[invitedIndex].socketId);
      io.to(userList[invitedIndex].socketId).emit('inviteChat', userList[inviteIndex].name);
    });

    socket.on('accept', (data) => {
      let inviteIndex = userList.findIndex((e) => {
        return e.name == data;
      });
      socket.join(userList[inviteIndex].socketId + '_' + socket.id);
      io.to(userList[inviteIndex].socketId).emit('inviteSuccess', '');
    });

    socket.on('reject', (data) => {
      let inviteIndex = userList.findIndex((e) => {
        return e.name == data;
      });
      io.to(userList[inviteIndex].socketId).emit('inviteFail', '');
    });

    socket.on('disconnect', () => {
      console.log('Bye~');
      onlineCount--;
      io.emit('refreshOnlineCount', onlineCount);
      let logoutIndex = userList.findIndex((e) => {
        return e.socketId == socket.id;
      });
      socket.broadcast.emit('lobbyOnMessage', userList[logoutIndex].name + ' leave the lobby.\n');
      userList.splice(logoutIndex,1);
      io.emit('refreshUserList', userList);
    });

  });
});





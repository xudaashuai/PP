const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const io = require('socket.io')(80);
const _ = require("underscore")._;
names = ['admin']
io.sockets.on('connection', function (socket) {
  socket.on('login', function (data) {
      console.log(data);
      if (names.indexOf(data.username) === -1) {
        socket.name = data.username;
        names.push(data.username)
        console.log('登陆成功', socket.name);
        socket.emit('login', {
          status: true,
          data: names
        })
        socket.broadcast.emit('info', {
          type: 'users',
          data: names,
          content: socket.name + '上线了哦'
        })
      } else {
        console.log('登陆失败用户已经在线了哦');
        socket.emit('login', {
          status: false,
        })
      }
    }
  );
  socket.on('message',
    function (data) {
      console.log(data);
      data.name=socket.name
      socket.broadcast.emit('message', data);
      console.log('发送成功', data);
    });
  socket.on('disconnect', function (data) {
    if (socket.name===undefined)
      return
    console.log(socket.name, '断开连接了哦')
    names.splice(socket.name)
    socket.broadcast.emit('info', {
      type: 'user',
      data: names,
      content: socket.name + '下线了哦'
    })
  });
});


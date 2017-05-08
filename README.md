## ChatRoom


### Tips

* 实时通信应用
  1. 信息必须对称，能够实时同步多个客户端的数据变化。
  2. 讨论有明确的上下文，能够针对特定对象更新数据。
  3. 应用能够持续运行，缓存必要数据，根据网络情况进行必要操作。
  4. server，多app，每个连接都是双工通道

* Socket.IO能够启动一个实时服务器，在不同版本的浏览器（包括移动设备浏览器在内）间实现实时通信。在多种传输方式中自动选择最优方式。

* 100%JavaSocket.IO的传输方式——自动fallback到浏览器支持的技术：

  ```
  WebSocket
  Adobe Flash Socket
  Ajax long polling
  Ajax multipart streaming
  Forever Iframe
  JSONP Polling
  ```


* Socket.IO由两部分组成：服务端是NodeJS搭建的HTTP服务器socket.io。客户端是：socket.io-client。只需要安装一个module即可：

  ```
  npm install socket.io --save
  ```

* improvements:

  ```
  Broadcast a message to connected users when someone connects or disconnects

  Add support for nicknames

  Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.

  Add “{user} is typing” functionality

  Show who’s online

  Add private messaging
  ```

* 触发事件: `socket.emit('eventName', {data})`
  响应事件：`socket.on('eventName', (data) => {})`

* 每个客户端每次发送数据，需要一个唯一的timestamp，用于标识服务器的响应是针对哪个客户端的请求
  ```
  cid = (new Date).getValue();
  socket.emit('eventName', {
      cid: cid,

  })
  socket.once("eventName#{cid}", (data) => {})
  ```

* `$(function(){})` 是 `$(document).ready(function(){})` 的简写，用来在DOM加载完成之后执行一系列预先定义好的函数

* 在connection事件的回调函数中，socket表示的是当前连接到服务器的那个客户端。所以代码`socket.emit('foo')`则只有自己收得到这个事件，而`socket.broadcast.emit('foo')`则表示向除自己外的所有人发送该事件，另外，上面代码中，io表示服务器整个socket连接，所以代码`io.sockets.emit('foo')`表示所有人都可以收到该事件



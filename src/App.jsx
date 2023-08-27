import { useEffect, useRef, useState } from 'react'
// ES modules
import { io } from "socket.io-client";
import './App.css'
import ChatComponent from './ChatComponent';

function App() {
  const [msgList, setmsgList] = useState([])
  const [socket, setsocket] = useState(null)
  useEffect(() => {
    const socketn = io("http://192.168.0.101:3000");

    console.log(socketn.id); // undefined

    socketn.on("connect", () => {
      console.log(socketn.id); // "G5p5..."
      setsocket(socketn)
    });


    socketn.on('chat message', function (msg) {

      setmsgList((oldmsg) => [...oldmsg, msg])

    });


  }, [])

  return (
    <>
      <h1>welcome</h1>

      <ChatComponent socket={socket} msgList={msgList} />
    </>
  )
}

export default App

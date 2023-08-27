import { useEffect, useRef, useState } from 'react'
// ES modules
import { io } from "socket.io-client";
import './App.css'
import ChatComponent from './ChatComponent';

function App() {
  const [msgList, setmsgList] = useState([])
  const [webcamData, setwebCamData] = useState('')
  const [streamData, setstreamData] = useState(null)
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
    socketn.on('webcam', function (msg) {

      setwebCamData(msg)

    });
    socketn.on('stream', function (msg) {

      console.log("Got stream")
      console.log(msg)
      setstreamData(msg)

    });


  }, [])

  return (
    <>
      <h1>welcome</h1>

      <img src={webcamData} width={200} height={200} />
      <ChatComponent socket={socket} msgList={msgList} />
    </>
  )
}

export default App

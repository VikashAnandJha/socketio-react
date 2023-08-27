import React from 'react'
import { useEffect, useRef, useState } from 'react'
import Webcam from "react-webcam";

// ES modules 
function ChatComponent({ socket, msgList }) {
    const [startCapture, setstartCapture] = useState(false)
    const webcamRef = React.useRef(null);
    const [inputValue, setinputValue] = useState('')
    const inputRef = useRef()
    const msgRef = useRef()
    const el = useRef(null);
    const videoConstraints = {
        width: 200,
        height: 200,
        facingMode: "user"
    };
    useEffect(() => { //u
        el.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    });



    const handleSend = () => {

        let msg = inputRef.current.value;

        socket.emit('chat message', msg);
        setinputValue('')
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSend()
        }
    };



    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            socket.emit('webcam', imageSrc);
        },
        [webcamRef]
    );

    useEffect(() => {

        setInterval(function () {

            if (startCapture) {
                capture()
            }
        }, 5000)


    }, [startCapture, socket])



    return (
        <div>


            <div>
                <Webcam
                    audio={false}
                    height={200}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={200}
                    videoConstraints={videoConstraints}
                />
                <button onClick={() => setstartCapture(true)}>Capture photo</button>



                <div id='msg-list' ref={msgRef}>

                    {msgList.map((msg, i) => {
                        return <li key={i}>{msg}</li>
                    })}
                    <div id={'el'} ref={el}></div>
                </div>
                <div id='input-area'>
                    <input onKeyDown={handleKeyDown} value={inputValue} onChange={(e) => setinputValue(e.target.value)} type='text' ref={inputRef} /><button onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default ChatComponent
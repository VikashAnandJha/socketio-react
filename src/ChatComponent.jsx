import React from 'react'
import { useEffect, useRef, useState } from 'react'
// ES modules 
function ChatComponent({ socket, msgList }) {

    const [inputValue, setinputValue] = useState('')
    const inputRef = useRef()
    const msgRef = useRef()
    const el = useRef(null);
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
    return (
        <div>


            <div>
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
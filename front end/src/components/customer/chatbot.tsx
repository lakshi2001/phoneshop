import React, { useState , useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBCardFooter
} from 'mdb-react-ui-kit';

import axios from 'axios';
import WebSocket from 'ws';


import Navbar from './nav';
import './ChatApp.css'; 

interface Message {
  text: string;
  sender: string;
}

const ChatApp: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');


    function web_socket(){
        const wss = new WebSocket.Server({ port: 8080 });
    }

    useEffect(() => {
        //web_socket();
        console.log(1);
    },[]);
    // const wss = new WebSocket.Server({ port: 8080 });

    // wss.on('connection', (ws) => {
    // console.log('Client connected');

    // ws.on('message', (message) => {
    //     console.log(`Received message: ${message}`);
    //     ws.send('Received your message');
    // });

    // ws.on('close', () => {
    //     console.log('Client disconnected');
    // });
    // });

  const handleMessageSubmit = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');

      // Here, you would typically send the message to the server or chatbot
      // and handle the response to update the messages state accordingly
    }
  };

  return (
    <>
    <Navbar/>
    <div style={{backgroundColor : '#E2E7E9' , paddingBottom:'6%'}}>
        <div className='text-center mb-4 pt-5'>
            <h1 className='text-decoration-underline'>Chat Now</h1>
        </div>
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                    {message.text}
                </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleMessageSubmit}>Send</button>
            </div>
        </div>
    </div>
    </>
  );
};

export default ChatApp;

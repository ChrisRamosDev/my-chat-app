import React, { useState, useEffect } from "react";

import queryString from "query-string";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { Link } from "react-router-dom";

import Input from "./Input";
import Message from "./Message";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:5000";

  // useEffect that takes the username/chosen room from Join.js
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    socket = io(ENDPOINT);

    // join chat
    socket.emit("join", { name, room }, () => {});

    // get room and users
    socket.on("usersInRoom", ({ room, users }) => {
      const usersInRoom = [];
      users.forEach((user) => {
        usersInRoom.push(user);
      });
      setUsers(usersInRoom);
    });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  // useEffect for the message logic
  useEffect(() => {
    socket.on(
      "message",
      (message) => {
        setMessages([...messages, message]);
      },
      [messages]
    );
  });
  // message sending function

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className='chat-container'>
      <header className='chat-header'>
        <h1>Chatt</h1>
        <Link to='/'>
          <button className='exit-btn'>Leave Room</button>
        </Link>
      </header>
      <main className='chat-main'>
        <div className='chat-sidebar'>
          <h3>Room Name: </h3>
          <h2>{room}</h2>
          <h3>Users:</h3>
          <ul id='users'>
            {users.map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
        </div>
        <ScrollToBottom className='messages'>
          {messages.map((message, i) => (
            <div key={i}>
              <Message message={message} name={name} />
            </div>
          ))}
        </ScrollToBottom>
      </main>
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;

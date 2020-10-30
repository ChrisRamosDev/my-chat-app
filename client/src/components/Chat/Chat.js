import React, { useState, useEffect } from "react";

import queryString from "query-string";
import io from "socket.io-client";
import { Link } from "react-router-dom";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const ENDPOINT = "localhost:5000";

  // useEffect that takes the username/chosen room from Join.js
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    socket = io(ENDPOINT);

    socket.emit("join", { name, room }, () => {});

    console.log(name, room);
    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  return (
    <div className='chat-container'>
      <header className='chat-header'>
        <h1>Chatt</h1>
        <Link to='/'>
          <button className='exit-btn'>Leave Room</button>
        </Link>
      </header>
      <main>
        <div className='chat-sidebar'>
          <h3>Room Name: </h3>
          <h2>{room}</h2>
          <h3>Users:</h3>
          <ul id='users'>
            <li>Chris</li>
            <li>Christa</li>
            <li>Raven</li>
            <li>{name}</li>
          </ul>
        </div>
        <div className='message'>
          <p className='meta'>
            Brad <span>9:12pm</span>
          </p>
          <p className='text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
            repudiandae.
          </p>
        </div>
      </main>
      <div className='chat-input-container'>
        <form id='chat-input-form'>
          <input
            id='message'
            type='text'
            placeholder='Enter Message'
            required
            autoComplete='off'
          />
          <button class='chat-input-btn'>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

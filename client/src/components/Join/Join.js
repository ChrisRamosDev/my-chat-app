import React, { useState } from "react";
import "./Join.css";

import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className='join-container'>
      <header className='join-header'>
        <h1>Chatt</h1>
      </header>
      <main className='join-main'>
        <form action='#'>
          <div>
            <label htmlFor='name' className='username'>
              Username
            </label>
            <input
              type='text'
              placeholder='Enter your username'
              onChange={(event) => setName(event.target.value)}
              className='join-input'
            />
          </div>
          <div>
            <label htmlFor='room'>Select Room</label>
            <select
              name='room'
              id='room'
              onChange={(event) => setRoom(event.target.value)}
            >
              <option value=''>-- Rooms --</option>
              <option value='room1'>Room 1</option>
              <option value='room2'>Room 2</option>
              <option value='room3'>Room 3</option>
            </select>
            <Link
              // passes username and room to Chat component
              onClick={(event) =>
                !name || !room ? event.preventDefault() : null
              }
              to={`/chat?name=${name}&room=${room}`}
            >
              <button type='submit' className='join-btn'>
                Sign In
              </button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Join;

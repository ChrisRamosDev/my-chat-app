import React, { useState } from "react";
import "./Join.css";

import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className='join-container'>
      <header>
        <h1>Chatt</h1>
      </header>
      <main>
        <form action='#'>
          <div>
            <label for='name' className='username'>
              Username
            </label>
            <input
              type='text'
              placeholder='Enter your username'
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div>
            <label for='room'>Select Room</label>
            <select
              name='room'
              id='room'
              onChange={(event) => setRoom(event.target.value)}
              required
            >
              <option value=''>-- Rooms --</option>
              <option value='room #1'>Pups</option>
              <option value='room #1'>Kits</option>
              <option value='room #1'>Birds</option>
            </select>
            <Link
              onClick={(event) =>
                !name || !room ? event.preventDefault() : null
              }
              to='/chat'
            >
              <button type='submit'>Submit</button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Join;

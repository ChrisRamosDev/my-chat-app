import React from "react";

const Input = ({ message, setMessage, sendMessage }) => (
  <div className='chat-input-container'>
    <form className='chat-input-form'>
      <input
        type='text'
        placeholder='Enter your message'
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button
        className='chat-input-btn'
        onClick={(event) => sendMessage(event)}
      >
        Send
      </button>
    </form>
  </div>
);

export default Input;

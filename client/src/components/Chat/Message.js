import React from "react";

const Message = ({ message: { user, text }, name }) => {
  let fromCurrentUser = false;

  const trimmed = name.trim().toLowerCase();

  if (user === trimmed) {
    fromCurrentUser = true;
  }

  return fromCurrentUser ? (
    <div>
      <p>{trimmed}</p>
      <div>
        <p>{text}</p>
      </div>
    </div>
  ) : (
    <div>
      <div>
        <p>{text}</p>
      </div>
      <p>{user}</p>
    </div>
  );
};

export default Message;

import React from "react";
import * as dayjs from "dayjs";

const Message = ({ message: { user, text }, name }) => {
  let fromCurrentUser = false;

  const trimmed = name.trim().toLowerCase();

  if (user === trimmed) {
    fromCurrentUser = true;
  }

  return fromCurrentUser ? (
    <div className='msg-outer-wrapper sent'>
      <p className='msg-user'>{trimmed}</p>
      <div className='msg-inner-wrapper'>
        <p className='message'>{text}</p>
      </div>
      <small className='time'>{dayjs().format("h:mma")}</small>
    </div>
  ) : (
    <div className='msg-outer-wrapper received'>
      <div className='msg-inner-wrapper'>
        <p className='message'>{text}</p>
      </div>
      <p className='msg-user'>{user}</p>
      <small className='time'>{dayjs().format("h:mma")}</small>
    </div>
  );
};

export default Message;

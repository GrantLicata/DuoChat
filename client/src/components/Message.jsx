import React from "react";

const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img
          src="https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Message image"
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        {/* <img
          src="https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Chat image"
        /> */}
      </div>
    </div>
  );
};

export default Message;

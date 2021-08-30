import React from "react";
import "../assets/styles/Message.scss";

const Chat = ({ user, username, message, createdAt }) => {
  const date = new Date(createdAt);
  let [month, day, hour, minute] = [
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ];
  let received_msg = false;
  const usertype = "student";

  if (user.username !== username) {
    received_msg = true;
  }

  if (month === 0) {
    month = "January";
  } else if (month === 1) {
    month = "February";
  } else if (month === 2) {
    month = "March";
  } else if (month === 3) {
    month = "April";
  } else if (month === 4) {
    month = "May";
  } else if (month === 5) {
    month = "June";
  } else if (month === 6) {
    month = "July";
  } else if (month === 7) {
    month = "August";
  } else if (month === 8) {
    month = "September";
  } else if (month === 9) {
    month = "October";
  } else if (month === 10) {
    month = "November";
  } else if (month === 11) {
    month = "December";
  }

  return (
    <>
      {received_msg ? (
        <div className="received_msg">
          <div className="received_withd_msg">
            <p>{message}</p>
            <span className="time_date">
              {username} | {usertype} | {hour}:{minute} | {month} {day}
            </span>
          </div>
        </div>
      ) : (
        <div className="outgoing_msg">
          <div className="sent_msg">
            <p>{message}</p>
            <span className="time_date">
              {usertype} | {hour}:{minute} | {month} {day}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;

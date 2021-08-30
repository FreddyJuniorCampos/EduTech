import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMessages, sendMessage } from "../actions";
import Message from "./Message";
import "../assets/styles/Chat.scss";

const Chat = () => {
  const { messages, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [messageText, setValues] = useState({
    inputMessage: "",
  });

  useEffect(() => {
    const listMessages = async (token) => {
      dispatch(loadMessages(token));
    };

    listMessages(user.token);
  }, [messages]);

  const handleInput = (event) => {
    setValues({
      ...messageText,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (messageText.inputMessage) {
      dispatch(sendMessage(user.token, user, messageText.inputMessage));
      setValues({
        inputMessage: "",
      });
      document.getElementById("inputMessage").reset();
    }
  };

  return (
    <div className="container-fluid d-flex flex-row-reverse">
      <div className="row">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div className="chat">
              <div className="chat-history">
                <ul className="m-b-0">
                  <li className="clearfix">
                    {messages.map((item) => (
                      <Message key={item._id} {...item} />
                    ))}
                  </li>
                </ul>
              </div>
              <div className="chat-message">
                <form
                  id="inputMessage"
                  className="input-group mb-0"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    className="form-control rounded-3 mr-5"
                    placeholder="Write a message"
                    name="inputMessage"
                    onChange={handleInput}
                  />
                  <button className="btn btn-success ml-5" type="submit">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

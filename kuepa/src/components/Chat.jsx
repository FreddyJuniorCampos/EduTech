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
  }, []);

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
          <div className="card">
            <div className="mesgs">
              <div className="msg_history">
                {messages.map((item) => (
                  <Message key={item._id} {...item} user={user} />
                ))}
              </div>
              <div className="type_msg">
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
                  <button className="btn btn-success" type="submit">
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

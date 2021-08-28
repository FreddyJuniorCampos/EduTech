import React from "react";
import "../assets/styles/Home.scss";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app">
              <div className="chat">
                <div className="chat-history">
                  <ul className="m-b-0">
                    <li className="clearfix">
                      <div className="message-data text-right">message 1</div>
                      <div className="message-data text-right">message 2</div>
                      <div className="message-data text-right">message 3</div>
                      <div className="message-data text-right">message 4</div>
                      <div className="message-data text-right">message 5</div>
                      <div className="message-data text-right">message 6</div>
                    </li>
                  </ul>
                </div>
                <div className="chat-message clearfix">
                  <div className="input-group mb-0">
                    <input
                      type="text"
                      className="form-control rounded-3 mr-5"
                      placeholder="Write a message"
                    />
                    <button className="btn btn-success ml-5">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

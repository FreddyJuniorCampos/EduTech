import React from "react";
import "../assets/styles/Home.scss";
import Chat from "../components/Chat";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <iframe
          width="1200"
          height="1200"
          src="https://www.youtube.com/embed/WZ3drnsSwFk"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          className="video_container"
        ></iframe>
        <Chat />
      </div>
    </>
  );
};

export default Home;

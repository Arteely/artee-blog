import { useEffect, useState } from "react";
import Headline from "../Headline";
import Card from "../Card";
import CardBox from "../CardBox";
import Story from "../Story";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/story")
      .then((response) => response.json())
      .then((stories) => {
        setStories(stories);
      });
  }, []);

  const handleStartReading = () => {
    const mainStoriesElement = document.getElementById("main-stories");
    if (mainStoriesElement) {
      mainStoriesElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/*<div className="landing-title">
        <h1>STAY CURIOUS.</h1>
        <p>
          Discover stories, thinking, and expertise from writers on any topic.
          Lorem Ipsum dolor sit amet.
        </p>
        <button className="btn-main" onClick={handleStartReading}>
          START READING
        </button>
      </div>*/}
      {posts.length > 0 && (
        <div id="main-stories" className="main-stories">
          {/* Display the last element */}
          <Headline {...posts[posts.length - 1]} />
          <div className="cards">
            <h6>LATEST STORIES</h6>
            {/* Display the last 5 cards */}
            {posts
              .slice(-6, -1)
              .reverse()
              .map((post, index) => (
                <Card {...post} key={post.id} number={index + 1} />
              ))}
          </div>
        </div>
      )}
      {posts.length > 5 && (
        <div className="cardbox-container">
          {/* Display the last 5 cards */}
          {posts
            .slice(-10, -6)
            .reverse()
            .map((post, index) => (
              <CardBox {...post} key={post.id} number={index + 1} />
            ))}
        </div>
      )}
    {stories.length > 0 && (
        <div className="tags-stories">
          {/* Display the last element */}
          {stories
              .map((story, index) => (
                <Story {...story} key={story.id} number={index + 1} />
              ))}
        </div>
      )}
    </>
  );
}

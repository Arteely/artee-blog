import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Headline from "../Headline";

function TagPage() {
  const { tag } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/tag/${tag}`)
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);

  return (
    <>
      <div className="category-container">
        <h6>STORIES TAGGED:</h6>
        <h1>{tag}</h1>
        <p>
          The latest tech news about the world's best (and sometimes worst)
          hardware, apps, and much more. From top companies like Google and
          Apple to tiny startups vying for your attention, Verge Tech has the
          latest in what matters in technology daily.
        </p>
      </div>
      {posts.length > 0 && (
        <div id="main-stories" className="main-stories">
          {/* Display the last element */}
          <Headline {...posts[posts.length - 1]} />
          <Headline {...posts[posts.length - 2]} />
        </div>
      )}
    </>
  );
}

export default TagPage;

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import ReadingTime from "../ReadTime";
import CardCompact from "../CardCompact";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/post")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);

  if (!postInfo) return "";
  return (
    <div className="post-main">
      <div className="post-title">
        <Link to={`/tag/${postInfo.tag}`}>
          <h6 className="chip-main">{postInfo.tag}</h6>
        </Link>
        <h1>{postInfo.title}</h1>
        <div className="post-summary">
          <div>
            <p>{postInfo.summary}</p>
            <div className="article-info">
              <a href="" className="author">
                {postInfo.author.firstname + " " + postInfo.author.lastname}
              </a>
              <div className="vl"></div>
              <ReactTimeAgo date={postInfo.createdAt} locale="en-US" />
              <div className="vl"></div>
              <ReadingTime content={postInfo.content} />
              {userInfo.id === postInfo.author._id && (
                <>
                <div className="vl"></div>
                  <Link className="chip-sm" to={`/edit-post/${postInfo._id}`}>
                    EDIT POST
                  </Link>
                </>
              )}
            </div>
          </div>
          <img src={"http://localhost:4000/" + postInfo.cover} />
        </div>
      </div>
      <div className="post-content-container">
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
        <div className="post-suggested">
          <div></div>
          <div>
            {posts.length > 5 && (
              <div className="compact-container">
                {/* Display the last 5 cards */}
                {posts
                  .slice(-10, -6)
                  .reverse()
                  .map((post, index) => (
                    <CardCompact {...post} key={post.id} number={index + 1} />
                  ))}
              </div>
            )}
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { TwitterTweetEmbed } from 'react-twitter-embed';

export default function StoryPage() {
  const [storyInfo, setStoryInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/story/${id}`).then((response) => {
      response.json().then((storyInfo) => {
        setStoryInfo(storyInfo);
      });
    });
  }, []);

  if (!storyInfo) return ""; // Add a conditional check here

  const convertToEmbedLink = (url) => {
    const videoId = url.split("v=")[1];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const convertTwittertoLink = (url) => {
    const tweetId = url.split("status/")[1];
    return tweetId;
  }

  const firstLetter = storyInfo.author.firstname.charAt(0);

  return (
    <div className="story-page-container">
      <div className="story-divider">
        <h3>{firstLetter}</h3>
        <div className="vl"></div>
      </div>
      <div>
        <div className="article-info">
          <a href="/" className="author">
            {storyInfo.author.firstname + " " + storyInfo.author.lastname}
          </a>
          <div className="vl"></div>
          <ReactTimeAgo date={storyInfo.createdAt} locale="en-US" />
          <div className="vl"></div>
          <Link to={`/tag/${storyInfo.tag}`}>
            <p className="chip-sm">{storyInfo.tag}</p>
          </Link>

          {userInfo.id === storyInfo.author._id && (
            <>
              <div className="vl"></div>
              <Link className="chip-sm" to={`/edit-story/${storyInfo._id}`}>
                EDIT STORY
              </Link>
            </>
          )}
        </div>
        <div className="story-content">
          <div>{storyInfo.title}</div>
          <p dangerouslySetInnerHTML={{ __html: storyInfo.content }} />
        </div>
        {storyInfo.cover && (
          <img src={"http://localhost:4000/" + storyInfo.cover} alt="" />
        )}
        {storyInfo.twitterEmbed && (
          <TwitterTweetEmbed
          tweetId={convertTwittertoLink(storyInfo.twitterEmbed)}
          hide_media="false"
          theme="dark"
        />
        )}
        {storyInfo.youtubeEmbed && (
          <div className="iframe-container">
            <iframe
              width="100%"
              height="315"
              src={convertToEmbedLink(storyInfo.youtubeEmbed)}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>
        )}
      </div>
    </div>
  );
}

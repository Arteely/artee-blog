import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { TwitterTweetEmbed } from "react-twitter-embed";

export default function Story({
  title,
  content,
  _id,
  cover,
  tag,
  createdAt,
  author,
  twitterEmbed,
  youtubeEmbed,
}) {
  const firstLetter = author.firstname.charAt(0);

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
  };

  return (
    <Link className="story-container" to={`/story/${_id}`}>
      <div className="story-divider">
        <h3>{firstLetter}</h3>
        <div className="vl"></div>
      </div>
      <div>
        <div className="article-info">
          <a href="/" className="author">
            {author.firstname + " " + author.lastname}
          </a>
          <div className="vl"></div>
          <ReactTimeAgo date={createdAt} locale="en-US" />
          <div className="vl"></div>
          <Link to={`/tag/${tag}`}>
            <p className="chip-sm">{tag}</p>
          </Link>
        </div>
        <div className="story-content">
          <div>{title}</div>
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        {cover && (
          <Link to={`/story/${_id}`}>
            <img src={`/${cover}`} alt="Post Cover"></img>
          </Link>
        )}
        {twitterEmbed && (
          <TwitterTweetEmbed
            tweetId={convertTwittertoLink(twitterEmbed)}
            hide_media="false"
            data-theme="dark"
            align="center"
          />
        )}
        {youtubeEmbed && (
          <div className="iframe-container">
            <iframe
              width="100%"
              height="315"
              src={convertToEmbedLink(youtubeEmbed)}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>
        )}
      </div>
    </Link>
  );
}

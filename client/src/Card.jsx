import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import ReadingTime from "./ReadTime";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);

export default function Card({
  title,
  cover,
  content,
  createdAt,
  number,
  _id,
  tag,
  author,
}) {
  return (
    <div className="card-article">
      <h6>{number}</h6>
      <div className="vl"></div>
      <div className="card-title">
        <Link to={`/post/${_id}`}>
          <h3>{title}</h3>
        </Link>
        <div className="article-info">
          <a href="" className="author">
            {author.firstname + " " + author.lastname}
          </a>
          <div className="vl"></div>
          <ReactTimeAgo date={createdAt} locale="en-US" />
          <div className="vl"></div>
          <ReadingTime content={content} />
          <div className="vl"></div>
          <Link to={`/tag/${tag}`}>
            <p className="chip-sm">{tag}</p>
          </Link>
        </div>
      </div>
      <Link to={`/post/${_id}`}>
        <img src={`/${cover}`} alt="Post Cover"></img>
      </Link>
    </div>
  );
}

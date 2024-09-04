import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

export default function CardCompact({ title, _id, tag, number, author, createdAt }) {
  return (
    <div className="compact-card">
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
          <p className="chip-sm">{tag}</p>
        </div>
      </div>
    </div>
  );
}

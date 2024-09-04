import { Link } from "react-router-dom";
import ReadingTime from "./ReadTime";

export default function CardBox({
  title,
  summary,
  _id,
  cover,
  content,
  tag,
  author,
}) {
  return (
    <div className="cardbox">
      <Link to={`/post/${_id}`}>
        <img src={"http://localhost:4000/" + cover} alt="" />
      </Link>
      <Link to={`/tag/${tag}`}>
        <h6 className="chip-main">{tag}</h6>
      </Link>
      <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
      </Link>
      <p className="short-desc">{summary}</p>
      <div className="article-info">
        <a href="/" className="author">
          {author.firstname + " " + author.lastname}
        </a>
        <div className="vl"></div>
        <ReadingTime content={content} />
      </div>
    </div>
  );
}

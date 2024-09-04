import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [tag, setTag] = useState([]);
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    data.set('tag', tag);
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="create-post" onSubmit={createNewPost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />

      <textarea
        type="summary"
        placeholder={"Summary"}
        rows={4}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />

      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />

      <input
        type="text"
        placeholder="Tags"
        value={tag}
        onChange={(ev) => setTag(ev.target.value)}
      />

      <Editor value={content} onChange={setContent} />
      <button className="btn-main">Add Post</button>
    </form>
  );
}

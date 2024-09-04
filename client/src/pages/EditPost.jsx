import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [tag, setTag] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
        setTag(postInfo.tag);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("tag", tag);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }
  

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <form className="create-post" onSubmit={updatePost}>
      <input
        type="text"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />

      <textarea
        type="text"
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

      <Editor onChange={setContent} value={content} />
      <button className="btn-main">Update Post</button>
    </form>
  );
}

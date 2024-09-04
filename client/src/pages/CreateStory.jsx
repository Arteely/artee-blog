import { useState } from "react";
import Editor from "../Editor";
import { Navigate } from "react-router-dom";

export default function CreateStory() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [files, setFiles] = useState("");
  const [twitterEmbed, setTwitterEmbed] = useState("");
  const [youtubeEmbed, setYoutubeEmbed] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewStory(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("content", content);
    data.set("tag", tag);
    data.set('file', files[0]);
    data.set("twitterEmbed", twitterEmbed);
    data.set("youtubeEmbed", youtubeEmbed);
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/story", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="create-post" onSubmit={createNewStory}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <Editor value={content} onChange={setContent} />

      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />

      <input
        type="text"
        placeholder="Tags"
        value={tag}
        onChange={(ev) => setTag(ev.target.value)}
      />
      <input
        type="text"
        placeholder={"Twitter Link"}
        value={twitterEmbed}
        onChange={(ev) => setTwitterEmbed(ev.target.value)}
      />
      <input
        type="text"
        placeholder={"Youtube Link"}
        value={youtubeEmbed}
        onChange={(ev) => setYoutubeEmbed(ev.target.value)}
      />

      <button className="btn-main">Add Story</button>
    </form>
  );
}

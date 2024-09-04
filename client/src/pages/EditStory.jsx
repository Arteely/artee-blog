import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditStory() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [tag, setTag] = useState("");
  const [twitterEmbed, setTwitterEmbed] = useState("");
  const [youtubeEmbed, setYoutubeEmbed] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/story/" + id).then((response) => {
      response.json().then((storyInfo) => {
        setTitle(storyInfo.title);
        setContent(storyInfo.content);
        setTag(storyInfo.tag);
        setFiles(storyInfo.cover);
        setTwitterEmbed(storyInfo.twitterEmbed);
        setYoutubeEmbed(storyInfo.youtubeEmbed);
      });
    });
  }, []);

  async function updateStory(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("content", content);
    data.set("tag", tag);
    data.set("id", id);
    data.set("twitterEmbed", twitterEmbed);
    data.set("youtubeEmbed", youtubeEmbed);
    if(isChecked){
      data.set("file", "");
    } else if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("http://localhost:4000/story", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  if (redirect) {
    return <Navigate to={"/story/" + id} />;
  }

  return (
    <form className="create-post" onSubmit={updateStory}>
      <input
        type="text"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <div>
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className={isChecked ? "checked" : ""}
          />
          Remove Image
        </label>
      </div>
      

      <input
        type="text"
        placeholder="Tags"
        value={tag}
        onChange={(ev) => setTag(ev.target.value)}
      />
      <input
        type="text"
        placeholder="Twitter Embed"
        value={twitterEmbed}
        onChange={(ev) => setTwitterEmbed(ev.target.value)}
      />
      <input
        type="text"
        placeholder="Youtube Embed"
        value={youtubeEmbed}
        onChange={(ev) => setYoutubeEmbed(ev.target.value)}
      />

      <Editor onChange={setContent} value={content} />
      <button className="btn-main">Update Post</button>
    </form>
  );
}

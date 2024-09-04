import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import TagPage from "./pages/TagPage";
import CreateStory from "./pages/CreateStory";
import StoryPage from "./pages/StoryPage";
import EditStory from "./pages/EditStory";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={"/sign-in"} element={<LoginPage />} />
          <Route path={"/sign-up"} element={<RegisterPage />} />
          <Route path={"/create-post"} element={<CreatePost />} />
          <Route path={"/create-story"} element={<CreateStory />} />
          <Route path="/story/:id" element={<StoryPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/edit-story/:id" element={<EditStory />} />
          <Route path="/tag/:tag" element={<TagPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;

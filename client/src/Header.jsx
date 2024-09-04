import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("/.netlify/functions/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  async function logout() {
    try {
      const response = await fetch("/.netlify/functions/logout", {
        credentials: "include",
        method: "POST",
      });

      if (response.ok) {
        setUserInfo(null);
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        <svg
          width="35"
          height="30"
          viewBox="0 0 40 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 30.7396H6L20 6.73956L34 30.7396H24.04"
            stroke="#FA2805"
            strokeWidth="6"
          />
        </svg>
        <h3>ARTMYV</h3>
      </Link>
      <nav>
        <Link to="/tag/tech-news">Tech</Link>
        <Link to="/tag/reviews">Reviews</Link>
        <Link to="/tag/entertainment">Entertainment</Link>
        <Link to="/more">More +</Link>
        <div className="vl"></div>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.76 11.0096L17.49 16.7396L16 18.2296L10.27 12.4996C9.2 13.2696 7.91 13.7396 6.5 13.7396C2.91 13.7396 0 10.8296 0 7.23956C0 3.64956 2.91 0.739563 6.5 0.739563C10.09 0.739563 13 3.64956 13 7.23956C13 8.64956 12.53 9.93956 11.76 11.0096ZM6.5 2.73956C4.01 2.73956 2 4.74956 2 7.23956C2 9.72956 4.01 11.7396 6.5 11.7396C8.99 11.7396 11 9.72956 11 7.23956C11 4.74956 8.99 2.73956 6.5 2.73956Z"
            fill="#191919"
          />
        </svg>
        <div className="vl"></div>
        <div className="header-register">
          {username && (
            <>
              <Link to="/create-post">Add Post</Link>
              <Link to="/create-story">Add Story</Link>
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </>
          )}
          {!username && (
            <>
              <Link to="/sign-in">Sign In</Link>
              <Link to="/sign-up">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

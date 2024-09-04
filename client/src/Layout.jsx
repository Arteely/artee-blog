import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Header from "./Header";
import "./Layout.css";
import Footer from "./Footer"

export default function Layout() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <main>
        <Header />
        <CSSTransition
          in={isLoading}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <div className="loading-overlay" />
        </CSSTransition>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

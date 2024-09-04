import { useEffect, useState } from "react";

export default function ReadingTime({ content }) {
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const calculateReadingTime = () => {
      const words = content.trim().split(/\s+/).length;
      const wpm = 185;
      const time = Math.ceil(words / wpm);
      setReadingTime(time);
    };

    calculateReadingTime();
  }, [content]);

  return <p>{readingTime} MIN READ</p>;

}

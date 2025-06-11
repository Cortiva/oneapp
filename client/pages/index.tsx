import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Loading");

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/health-check")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
      });
  }, []);

  return <div className="bg-teal-200">{message}</div>;
}

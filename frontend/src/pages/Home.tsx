import { useEffect, useState } from "react";
import { getTestMessage } from "../services/apiServices";

function Home() {
  const [message, setMessage] = useState<string>("Loading...");

  useEffect(() => {
    getTestMessage()
      .then((data) => setMessage(data))
      .catch(() => setMessage("Failed to fetch message"));
  }, []);
  return <div>{message}</div>;
}

export default Home;

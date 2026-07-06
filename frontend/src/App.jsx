import { useEffect, useState } from "react";

function App() {
  const [ message, setMessage ] = useState("");

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    fetch(`${API_URL}/api/hello/`).then(
      response => response.json()
    ).then(
      data => {
        setMessage(data.message);
      }
    );
  }, []);

  return (
    <div>
      <h1>React + Django</h1>

      <p>{ message }</p>
    </div>
  );
}

export default App;
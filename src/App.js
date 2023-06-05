import { useState } from "react";
import { GiDiamondsSmile } from "react-icons/gi";
import axios from "axios";

import CGLogo from "../src/images/chatGPT.png";

import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // COMMUNICATE WITH THE API
    axios
      .post("http://localhost:5555/chat", { prompt })
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="wrapper">
      <div className="logoContainer">
        <div className="logo">
          <GiDiamondsSmile />
        </div>
        <h2 className="logoTitle">AskANYTHING</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="promptContainer">
          <textarea
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            cols="30"
            rows="10"
            placeholder="I'm at your service!"
          ></textarea>
        </div>

        <button type="submit">
          {loading ? (
            <img
              src={CGLogo}
              alt="ChatGPT-Logo"
              className={loading ? "cg-logo loading" : "cg-logo"}
            />
          ) : (
            "Ask!"
          )}
        </button>
      </form>
      <p className="response-area">{loading ? "loading..." : response}</p>

      <div className="footer">Phil the Creative</div>
    </div>
  );
}

export default App;

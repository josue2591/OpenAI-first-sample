import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState();
  const [image, setImage] = useState();


  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: textInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setResult(data.result);
      setImage(data.image);
      setTextInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>

      <main className={styles.main}>
        <h3>Playground</h3>
        <form onSubmit={onSubmit}>
          <textarea
          name="prompt"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}>
          </textarea>
          <input type="submit" value="Generate" />
        </form>
      </main>
      <sidebar className={styles.sidebar}>
        <div className={styles.result}>{result}</div>
        <img src={image} alt="This is the alt text"/>
      </sidebar>
    </div>
  );
}

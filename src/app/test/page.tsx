"use client";
import { useState } from "react";
import Head from "next/head";

<Head>
  <script src="https://cdn.jsdelivr.net/npm/only-this-page@version" async />
</Head>;

export default function Home() {
  const [count, setCount] = useState(0);

  // Simple JS function to handle button click
  const increment = () => {
    setCount(count + 1);
    console.log("Button clicked! Current count:", count + 1);
  };

  return (
    <div className="container">
      <h1>Simple Page with JavaScript</h1>
      <p>Click the button to increment the counter:</p>
      <button onClick={increment}>Click me!</button>
      <p>Counter: {count}</p>
    </div>
  );
}

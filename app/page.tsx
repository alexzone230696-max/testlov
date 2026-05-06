'use client';
import { useState } from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');

  const generate = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setCode(data.code);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Lovable Full MVP</h1>

      <textarea
        style={{ width: '100%', height: 100 }}
        placeholder="Describe your app"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={generate}>Generate</button>

      {code && (
        <Sandpack
          template="react"
          files={{
            "/App.js": code
          }}
        />
      )}
    </div>
  );
}
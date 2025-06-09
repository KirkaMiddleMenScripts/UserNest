import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Settings() {
  const { data: session, status } = useSession();
  const [background, setBackground] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [customUrl, setCustomUrl] = useState("");

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You need to log in</p>;

  const save = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: session.user.id,
        username: customUrl.toLowerCase(),
        displayName,
        background,
      }),
    });

    const result = await res.json();
    if (result.success) {
      window.location.href = `/${customUrl}`;
    } else {
      alert("Failed to save profile.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Customize Your Page</h2>
      <input placeholder="Display Name" value={displayName} onChange={e => setDisplayName(e.target.value)} /><br />
      <input placeholder="Custom URL (e.g. Akuma)" value={customUrl} onChange={e => setCustomUrl(e.target.value)} /><br />
      <input placeholder="Background Image URL" value={background} onChange={e => setBackground(e.target.value)} /><br />
      <button onClick={save}>Save</button>
    </div>
  );
}
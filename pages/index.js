import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Custom Profile Page</h1>
      {!session ? (
        <button onClick={() => signIn("discord")}>Login with Discord</button>
      ) : (
        <>
          <p>Welcome {session.user.name}</p>
          <Link href="/settings"><button>Go to Settings</button></Link>
          <button onClick={() => signOut()}>Logout</button>
        </>
      )}
    </main>
  );
}

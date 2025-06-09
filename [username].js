import supabase from "@/lib/supabase";

export async function getServerSideProps({ params }) {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.username)
    .single();

  if (!data) return { notFound: true };

  return { props: { profile: data } };
}

export default function Profile({ profile }) {
  return (
    <div
      style={{
        backgroundImage: `url(${profile.background})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        color: "white",
        textShadow: "0 0 4px black",
        padding: "3rem",
      }}
    >
      <h1>{profile.displayName || profile.username}</h1>
      <p>@{profile.username}</p>
    </div>
  );
}
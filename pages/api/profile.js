import supabase from "@/lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { id, username, displayName, background } = req.body;

  if (!id || !username) return res.status(400).json({ success: false });

  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id,
      username,
      displayName,
      background,
    });

  if (error) return res.status(500).json({ success: false });

  return res.json({ success: true });
}

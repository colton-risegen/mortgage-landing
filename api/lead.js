export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body;

  console.log("NEW LEAD RECEIVED:");
  console.log(body);

  return res.status(200).json({ success: true });
}

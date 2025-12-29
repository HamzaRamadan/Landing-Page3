export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false });

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbzh1Sn2IqQMBpRrgtvrfvXuukfYmGMr7c3ncFK_q2G37ptn3Phcl0xfHrz15310GMsJTw/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      }
    );

    const text = await response.text();
    return res.status(200).json({ success: true, data: text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
}

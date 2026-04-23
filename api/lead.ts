import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  let body = '';

  req.on('data', (chunk: any) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    const data = JSON.parse(body);

    console.log("NEW LEAD:", data);

    await supabase.from('leads').insert({
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
      zip: data.zip,
      billable: false
    });

    res.status(200).send('OK');
  });
}

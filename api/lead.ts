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

   const isBillable =
  data.trusted_form &&
  data.jornaya_id &&
  data.tcpa_text === "User agreed to TCPA consent on form submission";

await supabase.from('leads').insert({
  first_name: data.first_name,
  last_name: data.last_name,
  phone: data.phone,
  email: data.email,
  zip: data.zip,
  trusted_form: data.trusted_form,
  jornaya_id: data.jornaya_id,
  tcpa_text: data.tcpa_text,
  billable: isBillable
});

    res.status(200).send('OK');
  });
}

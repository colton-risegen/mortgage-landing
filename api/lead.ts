export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  let body = '';

  req.on('data', (chunk: any) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    console.log('NEW LEAD:', body);

    res.status(200).send('OK');
  });
}

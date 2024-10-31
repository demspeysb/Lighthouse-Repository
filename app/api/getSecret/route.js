import { NextResponse } from 'next/server';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient();

export async function POST(req) {
  const name = req.body;

  if (!name) {
    return NextResponse.json({ error: 'Secret name is required' }, { status: 400 });
  }

  try {
    const [version] = await client.accessSecretVersion({
      name: name,
    });

    const payload = version.payload.data.toString();
    return NextResponse.json({ secret: payload });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve secret' }, { status: 500 });
  }
}

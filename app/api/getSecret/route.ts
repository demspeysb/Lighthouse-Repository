import { NextResponse } from 'next/server';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient();

export async function POST(req: Request) {
  try {
    const body = await req.text(); // Ensure request body is properly read

    if (!body) {
      return NextResponse.json({ error: 'Secret name is required' }, { status: 400 });
    }

    const [version] = await client.accessSecretVersion({
      name: body,  // Use parsed body as the secret name
    });

    const payload = version?.payload?.data?.toString() ?? '';
    if (!payload) {
      return NextResponse.json({ error: 'Secret not found or empty' }, { status: 404 });
    }

    return NextResponse.json({ secret: payload });
  } catch (error) {
    console.error('Error retrieving secret:', error);
    return NextResponse.json({ error: 'Failed to retrieve secret' }, { status: 500 });
  }
}

const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const client = new SecretManagerServiceClient();

async function getJsonSecret(secretName) {
  try {
    if (!secretName) {
      throw new Error('Secret name is required');
    }

    const [version] = await client.accessSecretVersion({ name: secretName });
    const payload = version?.payload?.data?.toString();

    if (!payload) {
      throw new Error('Secret not found or empty');
    }

    const parsed = JSON.parse(payload);
    console.log(JSON.stringify(parsed));

  } catch (error) {
    console.error('Error retrieving JSON secret:', error);
    throw new Error('Failed to retrieve or parse JSON secret');
  }
}

getJsonSecret('projects/489795191195/secrets/apiServiceAccountKey/versions/latest')

module.exports = {
  getJsonSecret,
}

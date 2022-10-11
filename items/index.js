import fetch from 'node-fetch';
import { ManagedIdentityCredential, DefaultAzureCredential } from '@azure/identity';

const clientId = process.env.AZURE_CLIENT_ID;
const authorizedURL = process.env.AUTH_URL;
const oauthScope = process.env.API_SCOPE;
const scope = `${oauthScope}`;

export default async function httpTrigger(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  // const credential = new ManagedIdentityCredential(clientId);
  const credential = new DefaultAzureCredential();
  const { token } = await credential.getToken(scope);
  context.log('🚀 ~ file: index.js ~ line 13 ~ httpTrigger ~ token', token);

  try {
    const response = await fetch(authorizedURL, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });

    const body = await response.text();
    context.res = {
      // status: response.status /* Defaults to 200 */,
      body: body,
    };
  } catch (error) {
    context.log.error('there:', error);
  }
}

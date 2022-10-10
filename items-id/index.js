import fetch from 'node-fetch';
import { ManagedIdentityCredential, DefaultAzureCredential } from '@azure/identity';

const msi = process.env.AZURE_CLIENT_MID;
const authorizedURL = process.env.AUTH_URL;
const oauthScope = process.env.API_SCOPE;
const scope = `${oauthScope}`;

export default async function httpTrigger(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const credential = new ManagedIdentityCredential(msi);
  context.log('🚀 ~ file: index.js ~ line 8 ~ credential', credential);
  const { token } = await credential.getToken(scope);
  context.log('🚀 ~ file: index.js ~ line 13 ~ httpTrigger ~ token', token);

  try {
    const response = await fetch(authorizedURL, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });

    const body = await response.text();
    context.log('🚀 ~ file: index.js ~ line 25 ~ httpTrigger ~ body', body);
    context.res = {
      // status: response.status /* Defaults to 200 */,
      body: body,
    };
  } catch (error) {
    context.log.error('there:', error);
  }
}

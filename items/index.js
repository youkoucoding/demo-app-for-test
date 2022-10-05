import fetch from 'node-fetch';
import { ManagedIdentityCredential } from '@azure/identity';

const clientId = process.env.AZURE_CLIENT_ID;
const authorizedURL = process.env.AUTH_URL;

const credential = new ManagedIdentityCredential(clientId);

export default async function httpTrigger(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const response = await fetch(authorizedURL);

  const body = await response.text();

  const token = await credential.getToken();

  context.res = {
    status: response.status /* Defaults to 200 */,
    body: { body, token },
  };
}

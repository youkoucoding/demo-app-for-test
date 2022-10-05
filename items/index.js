import fetch from 'node-fetch';
import { ManagedIdentityCredential, DefaultAzureCredential } from '@azure/identity';

const clientId = process.env.AZURE_CLIENT_ID;
const authorizedURL = process.env.AUTH_URL;
const oauthScope = process.env.API_SCOPE;
const scope = `${oauthScope}`;

export default async function httpTrigger(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  try {
    const credential = new ManagedIdentityCredential(clientId);
    context.log('🚀 ~ file: index.js ~ line 8 ~ credential', credential);
    const token = await credential.getToken(scope);
    context.log('🚀 ~ file: index.js ~ line 13 ~ httpTrigger ~ token', token);
  } catch (error) {
    context.log.error(error);
  }

  // try {
  // } catch (error) {
  //   context.log.error(error);
  // }

  // const response = await fetch(authorizedURL, {
  //   headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  // });

  // const body = await response.text();

  context.res = {
    // status: response.status /* Defaults to 200 */,
    body: { body: 'hello world', token: 'hey token' },
  };
}

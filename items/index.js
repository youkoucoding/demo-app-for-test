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

  const responseMessage = 'hey'
    ? 'Hello, ' + 'Good morning' + '. This HTTP triggered function executed successfully.'
    : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.';

  context.res = {
    status: response.status /* Defaults to 200 */,
    body: { body, token },
  };
}

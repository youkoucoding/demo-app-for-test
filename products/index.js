import { CosmosClient } from '@azure/cosmos';
import { ManagedIdentityCredential } from '@azure/identity';

const dbEndpoint = process.env.AZURE_DB_ENDPOINT;
const dbKey = process.env.AZURE_DB_KEY;
const clientID = process.env.AZURE_MID;
const connectionString = ''.concat(
  ...['AccountEndpoint=', dbEndpoint, ';', 'AccountKey=', dbKey, ';']
);

const credential = new ManagedIdentityCredential(clientID);
const aadClient = new CosmosClient({
  endpoint: dbEndpoint,
  aadCredentials: credential,
});

export default async function httpTrigger(context, req) {
  try {
    const res = aadClient.database('<your db name>').container('<container name>').items.readAll();
    context.res = {
      // status: response.status /* Defaults to 200 */,
      body: [res, 'hello ok'],
    };
  } catch (error) {
    context.res = {
      body: [error, 'hello error'],
    };
  }
}

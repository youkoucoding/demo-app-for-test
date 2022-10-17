import { CosmosClient } from '@azure/cosmos';
import { ManagedIdentityCredential } from '@azure/identity';

const dbEndpoint = process.env.AZURE_DB_ENDPOINT;
const dbKey = process.env.AZURE_DB_KEY;
const clientID = process.env.AZURE_MID;
const connectionString = ''.concat(
  ...['AccountEndpoint=', dbEndpoint, ';', 'AccountKey=', dbKey, ';']
);

const credential = new ManagedIdentityCredential(clientID);
const client = new CosmosClient({
  endpoint: dbEndpoint,
  aadCredentials: credential,
});

export default async function httpTrigger(context, req) {
  try {
    // const { database } = await client.databases.createIfNotExists({ id: '<your db name>' });
    const database = await client.databases.readAll();
    context.log('🚀 ~ file: index.js ~ line 21 ~ httpTrigger ~ database', database);
    // await database.containers.createIfNotExists({ id: 'Customers' });
    // const iterator = database.containers.readAll();
    // const { resources: containersList } = await iterator.fetchAll();

    context.res = {
      status: 200 /* Defaults to 200 */,
      body: ['hello ok', database],
    };
  } catch (error) {
    context.res = {
      status: 400,
      body: ['hello error', error],
    };
  }
}

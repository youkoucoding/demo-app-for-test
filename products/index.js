// import { Cosmos } from './node-cosmos/src';

const dbEndpoint = process.env.AZURE_DB_ENDPOINT;
const dbKey = process.env.AZURE_DB_KEY;
const connectionString = ''.concat(...['AccountEndpoint=', dbEndpoint, ';', 'AccountKey=', dbKey]);

const db = await new Cosmos(connectionString).getDatabase('my-awesome-db');

export default async function httpTrigger(context, req) {
  console.log('🚀 ~ file: index.js ~ line 2 ~ httpTrigger ~ req', req);
  context.res = {
    // status: response.status /* Defaults to 200 */,
    body: 'products',
  };
}

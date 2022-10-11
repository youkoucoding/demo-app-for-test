import { Cosmos } from '../node-cosmos/dist/index.js';

const dbEndpoint = process.env.AZURE_DB_ENDPOINT;
const dbKey = process.env.AZURE_DB_KEY;
const connectionString = ''.concat(
  ...['AccountEndpoint=', dbEndpoint, ';', 'AccountKey=', dbKey, ';']
);

const db = await new Cosmos(connectionString).getDatabase('db-name');

export default async function httpTrigger(context, req) {
  const user1 = await db.read('Collection1', 'id001', 'Users');
  console.log('🚀 ~ file: index.js ~ line 2 ~ httpTrigger ~ req', req);
  context.res = {
    // status: response.status /* Defaults to 200 */,
    body: 'products',
  };
}

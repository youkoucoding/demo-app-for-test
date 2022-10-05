import { CosmosClient } from '@azure/cosmos';
import { credential } from '../config/identity';

const endpoint = process.env.AZURE_DB_ENDPOINT;
// const key = process.env.AZURE_DB_KEY;

const client = new CosmosClient({ endpoint, credential });
// const client = new CosmosClient({ endpoint, key });

const query1 = "Select * from c where c.id = '<what you want>'";

async function cosmosDBContainers(databaseID, containerID) {
  // const dbContainer = client.database(databaseID).container(containerID);
  // const { database } = await client.databases.createIfNotExists({ id: 'SmartCompany' });
  const data = await client.databases.readAll().fetchAll();

  // const queryIterator = dbContainer.items.query(query1);

  // const ids = [];
  // while (queryIterator.hasMoreResults()) {
  //   const { resources: results } = await queryIterator.fetchNext();
  //   if (results !== undefined) {
  //     ids.push(results);
  //   }
  // }

  // return ids;
  // const data = client.database('SmartCompany').container('ServiceManagement').items.readAll();
  return data;
}

export default async function httpTrigger(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const data = await cosmosDBContainers();

  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? 'Hello, ' + name + '. This HTTP triggered function executed successfully.'
    : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.';

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: { responseMessage, data },
  };
}

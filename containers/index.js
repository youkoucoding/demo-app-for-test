import { CosmosClient } from '@azure/cosmos';
import { DefaultAzureCredential, ManagedIdentityCredential } from '@azure/identity';

const clientId = process.env.AZURE_CLIENT_ID;
const endpoint = process.env.AZURE_DB_ENDPOINT;

// const key = process.env.AZURE_DB_KEY;

// const client = new CosmosClient({ endpoint, key });

async function cosmosDBContainers(databaseID, containerID) {
  const credential = new ManagedIdentityCredential(clientId);
  // const credential = new DefaultAzureCredential();
  const client = new CosmosClient({ endpoint, aadCredentials: credential });
  const dbContainer = client.database(databaseID).container(containerID);

  // const queryIterator = dbContainer.items.query(query1);

  // const ids = [];
  // while (queryIterator.hasMoreResults()) {
  //   const { resources: results } = await queryIterator.fetchNext();
  //   if (results !== undefined) {
  //     ids.push(results);
  //   }
  // }

  // return ids;
  return dbContainer;
}

const query1 = "Select * from c where c.id = '<what you want>'";

export default async function httpTrigger(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  try {
    const data = await cosmosDBContainers();
  } catch (error) {
    context.log.error('const data = await cosmosDBContainers():', error);
  }

  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? 'Hello, ' + name + '. This HTTP triggered function executed successfully.'
    : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.';

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: { responseMessage, res: data },
  };
}

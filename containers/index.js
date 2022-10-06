import { CosmosClient } from '@azure/cosmos';
import { ManagedIdentityCredential } from '@azure/identity';

const clientId = process.env.AZURE_CLIENT_ID;
const endpoint = process.env.AZURE_DB_ENDPOINT;

const key = process.env.AZURE_DB_KEY;

// const client = new CosmosClient({ endpoint, key });

const query1 = "Select * from c where c.id = '<what you want>'";

export default async function httpTrigger(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  async function cosmosDBContainers(databaseID, containerID) {
    // const dbContainer = client.database(databaseID).container(containerID);
    // const { database } = await client.databases.createIfNotExists({ id: 'SmartCompany' });
    try {
      const credential = new ManagedIdentityCredential(clientId);
    } catch (error) {
      context.log.error('new ManagedIdentityCredential(clientId):', error);
    }
    try {
      const client = new CosmosClient(endpoint, credential);
    } catch (error) {
      context.log.error('new CosmosClient(endpoint, credential): ', error);
    }

    try {
      const data = await client.databases.readAll().fetchAll();
    } catch (error) {
      context.log.error(error);
    }

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
    body: { responseMessage, data },
  };
}

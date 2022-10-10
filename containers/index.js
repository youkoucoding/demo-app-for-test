import { CosmosClient } from '@azure/cosmos';
import { CosmosDBManagementClient } from '@azure/arm-cosmosdb';
import { DefaultAzureCredential, ManagedIdentityCredential } from '@azure/identity';

const clientId = process.env.AZURE_CLIENT_ID;
const endpoint = process.env.AZURE_DB_ENDPOINT;

// const key = process.env.AZURE_DB_KEY;

// const client = new CosmosClient({ endpoint, key });

const query1 = "Select * from c where c.id = 'kintai-dev.smartcompany.dev'";

export default async function httpTrigger(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  async function cosmosDBContainers(databaseID, containerID) {
    const credential = new ManagedIdentityCredential(clientId);
    // const client = new CosmosClient({ endpoint, aadCredentials: credential });
    try {
      const client = new CosmosDBManagementClient(
        credential,
        'ae903ce3-6221-48e0-a5a2-ddea9fbf6162'
      );
      const resArray = new Array();
      for await (let item of client.service.list(
        'devops-smartcompany-dev',
        'smartcompany-admin-dev'
      )) {
        resArray.push(item);
      }
      context.log(resArray);
      return resArray;
    } catch (error) {
      context.log.error(error);
    }

    // const dbContainer = client.database('SmartCompany').container('ServiceManagement');

    // const queryIterator = dbContainer.items.query(query1);
    // const ids = [];
    // while (queryIterator.hasMoreResults()) {
    //   const { resources: results } = await queryIterator.fetchNext();
    //   if (results !== undefined) {
    //     ids.push(results);
    //   }
    // }
    // return ids;
  }

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

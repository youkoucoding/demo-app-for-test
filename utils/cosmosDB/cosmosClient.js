import { CosmosClient } from '@azure/cosmos';

const endpoint = process.env.AZURE_DB_ENDPOINT;
const key = process.env.AZURE_DB_KEY;

const client = new CosmosClient({ endpoint, key });

const query1 = "Select * from c where c._partition = 'Customers'";

export async function cosmosDBContainers(databaseID, containerID) {
  const dbContainer = client.database(databaseID).container(containerID);

  const queryIterator = dbContainer.items.query(query1);
  let count = 0;
  while (queryIterator.hasMoreResults() && count <= 100000) {
    const { resources: results } = await queryIterator.fetchNext();
    if (results !== undefined) {
      console.log(
        '🚀 ~ file: cosmosClient.js ~ line 18 ~ getCosmosDBContainers ~ results',
        results
      );
      count = count + results.length;
    }
  }
  console.log('🚀 ~ file: cosmosClient.js ~ line 19 ~ getCosmosDBContainers ~ count', count);
}

import { CosmosClient } from '@azure/cosmos';

const endpoint = process.env.AZURE_DB_ENDPOINT;
const key = process.env.AZURE_DB_KEY;

const client = new CosmosClient({ endpoint, key });

const query1 = "Select * from c where c.id = '<items what you want test>'";

export async function cosmosDBContainers(databaseID, containerID) {
  const dbContainer = client.database(databaseID).container(containerID);

  const queryIterator = dbContainer.items.query(query1);

  const ids = [];
  while (queryIterator.hasMoreResults()) {
    const { resources: results } = await queryIterator.fetchNext();
    if (results !== undefined) {
      ids.push(results);
    }
  }
  return ids;
}

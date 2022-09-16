import { CosmosDBManagementClient } from '@azure/arm-cosmosdb';
import { credential } from '../config/identity.js';
import {
  AZURE_SUBSCRIPTION_ID,
  AZURE_RESOURCE_GROUP,
  AZURE_COSMOSDB_ACCOUNT_NAME,
} from '../config/config.js';

/**
 * This sample demonstrates how to Retrieves the properties of an existing Azure Cosmos DB database account.
 *
 * @summary Retrieves the properties of an existing Azure Cosmos DB database account.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2022-08-15/examples/CosmosDBDatabaseAccountGet.json
 */
export async function cosmosDbDatabaseAccountGet() {
  const client = new CosmosDBManagementClient(credential, AZURE_SUBSCRIPTION_ID);
  const result = await client.databaseAccounts.get(
    AZURE_RESOURCE_GROUP,
    AZURE_COSMOSDB_ACCOUNT_NAME
  );
  // console.log('🚀 ~ file: index.js ~ line 21 ~ cosmosDbDatabaseAccountGet ~ result', result);
}

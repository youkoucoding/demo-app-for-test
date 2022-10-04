import { cosmosDbDatabaseAccountGet } from '../utils/cosmosDB/accountClient.js';
import { cosmosDBContainers } from '../utils/cosmosDB/cosmosClient.js';

export default async function httpTrigger(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  const { databaseID, containerID } = req.body;
  // cosmosDbDatabaseAccountGet().catch(console.error);
  const ids = await cosmosDBContainers(databaseID, containerID);

  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? 'Hello, ' + name + '. This HTTP triggered function executed successfully.'
    : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.';

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: ids,
  };
}

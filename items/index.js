import fetch from 'node-fetch';

export default async function httpTrigger(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const response = await fetch('https://github.com');

  const body = await response.text();

  context.log('🚀 ~ file: index.js ~ line 7 ~ httpTrigger ~ body', body);

  const responseMessage = 'hey'
    ? 'Hello, ' + 'Good morning' + '. This HTTP triggered function executed successfully.'
    : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.';

  context.res = {
    status: 200 /* Defaults to 200 */,
    body: { message: 'Hey there!' },
  };
}

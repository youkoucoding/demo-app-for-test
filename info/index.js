export async function httpTrigger(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  context.log('context contains: ', context);

  context.res = {
    status: 200 /* Defaults to 200 */,
    body: JSON.stringify(context, 2),
  };
}

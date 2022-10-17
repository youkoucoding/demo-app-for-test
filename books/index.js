export default async function httpTrigger(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  console.log('🚀 ~ file: index.js ~ line 3 ~ httpTrigger ~ processed', req.headers);

  console.log('🚀 ~ file: index.js ~ line 3 ~ httpTrigger ~ processed---------------');

  console.log('🚀 ~ file: index.js ~ line 5 ~ httpTrigger ~ reqHeaders', context);

  context.res = {
    status: 200,
    body: JSON.stringify(req.headers.accept, 4),
  };
}

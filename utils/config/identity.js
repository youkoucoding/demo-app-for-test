import { ManagedIdentityCredential } from '@azure/identity';

const clientId = process.env.AZURE_CLIENT_ID;
console.log('🚀 ~ file: identity.js ~ line 4 ~ clientId', clientId);

export const credential = new ManagedIdentityCredential(clientId);

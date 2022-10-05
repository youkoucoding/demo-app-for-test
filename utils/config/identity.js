import { ManagedIdentityCredential } from '@azure/identity';

const clientId = process.env.AZURE_CLIENT_ID;

export const credential = new ManagedIdentityCredential(clientId);

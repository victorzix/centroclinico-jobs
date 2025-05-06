import * as process from 'node:process';

export const celcashRequestUtils = () => ({
  headers: {
    Authorization: `Basic ${btoa(process.env.GALAX_ID + ':' + process.env.GALAX_HASH)}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  url: process.env.CELCASH_API_URL,
});

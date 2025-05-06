import * as process from 'node:process';

export const mediquoRequestUtils = () => ({
  headers: {
    'X-API-Key': process.env.MEDIQUO_API_KEY,
    'X-Secret-Key	': process.env.MEDIQUO_SECRET_KEY,
  },
  url: process.env.MEDIQUO_API_URL,
});

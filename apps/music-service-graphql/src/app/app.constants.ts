import https from 'https';

export const httpsAgent: https.Agent = new https.Agent({
  rejectUnauthorized: false
});
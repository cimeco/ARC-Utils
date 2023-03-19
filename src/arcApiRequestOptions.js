import { ARC_ACCESS_TOKEN } from 'fusion:environment';

export default () => ({
  gzip: true,
  json: true,
  timeout: 15000,
  headers: {
    Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
  }
});

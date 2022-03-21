import { ARC_ACCESS_TOKEN } from "fusion:environment";

export default function arcApiRequestOptions() {
  return {
    gzip: true,
    json: true,
    timeout: 15000,
    headers: {
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
    }
  };
}

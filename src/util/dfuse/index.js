import { createDfuseClient } from '@dfuse/client';

let dfuseClient;

const initDfuse = apiKey => {
  // init client
  dfuseClient = createDfuseClient({
    apiKey: apiKey,
    network: 'ropsten.eth.dfuse.io',
  });
};

export { initDfuse, dfuseClient };

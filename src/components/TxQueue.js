import React from 'react';
import { Box, Text } from 'grommet';

const TxQueue = () => (
  <Box fill gap="small">
    <Box fill={true} elevation={'medium'} background={'accent-2'} pad={'small'}>
      <Text textAlign={'center'} size={'large'}>
        Transaction Pool
      </Text>
    </Box>
    <Box fill={true} elevation={'small'} pad={'xsmall'}>
      <Text>No transaction</Text>
    </Box>
  </Box>
);

export default TxQueue;

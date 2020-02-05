import React from 'react';
import { Box, Text } from 'grommet';
import Balances from './Balances';
import Rates from './Rates';
import Return from './Return';

const Stats = () => (
  <Box fill gap="small">
    <Box fill={true} elevation={'medium'} pad={'small'} background={'accent-1'}>
      <Text textAlign={'center'} size={'large'}>
        Rate Monitor
      </Text>
    </Box>
    <Balances />
    <Rates />
    <Return />
  </Box>
);

export default Stats;

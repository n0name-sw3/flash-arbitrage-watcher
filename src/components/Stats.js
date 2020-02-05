import React from 'react';
import { Box } from 'grommet';
import Balances from './Balances';
import Rates from './Rates';
import Return from './Return';

const Stats = () => (
  <Box fill gap="small">
    <Balances />
    <Rates />
    <Return />
  </Box>
);

export default Stats;

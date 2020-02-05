import React from 'react';
import { Box, Grid } from 'grommet';
import Balances from './Balances';
import Rates from './Rates';
import Return from './Return';

const Stats = () => {
  return (
    <Box background={'brand'}>
      <Grid fill gap="small">
        <Balances />
        <Rates />
        <Return />
      </Grid>
    </Box>
  );
};

export default Stats;

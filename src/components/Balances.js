import React from 'react';
import { Box, Grid } from 'grommet';

const Balances = () => {
  return (
    <Box>
      <Grid fill columns={['50%', '50%']} rows={'flex'} gap="small">
        <Box>DAI</Box>
        <Box>BAT</Box>
      </Grid>
    </Box>
  );
};

export default Balances;

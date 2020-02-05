import React from 'react';
import { Box, Grid } from 'grommet';

const Return = () => (
  <Box>
    <Grid
      fill
      columns={['2/3', '1/3']}
      rows={['flex', 'flex']}
      gap="small"
      areas={[
        { name: 'returnTag', start: [0, 0], end: [0, 0] },
        { name: 'returnChart', start: [1, 0], end: [1, 0] },
        { name: 'feeTag', start: [0, 1], end: [0, 1] },
        { name: 'feeChart', start: [1, 1], end: [1, 1] },
      ]}
    >
      <Box gridArea="returnTag">returnTag</Box>
      <Box gridArea="returnChart">returnChart</Box>
      <Box gridArea="feeTag">feeTag</Box>
      <Box gridArea="feeChart">feeChart</Box>
    </Grid>
  </Box>
);

export default Return;

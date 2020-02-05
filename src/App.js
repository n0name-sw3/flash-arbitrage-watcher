import React from 'react';
import { Box, Grid, Grommet, Main } from 'grommet';
import Stats from './components/Stats';
import TxQueue from './components/TxQueue';

const App = () => {
  return (
    <Grommet>
      <Main pad="large">
        <Grid fill columns={['25%', '50%', '25%']} rows={['flex']} gap="small">
          <Box />
          <Box gap={'small'}>
            <Stats />
            <TxQueue />
          </Box>
          <Box />
        </Grid>
      </Main>
    </Grommet>
  );
};

export default App;

import React from 'react';
import { Box, Grommet, Main } from 'grommet';
import Stats from './components/Stats';
import TxQueue from './components/TxQueue';

const App = () => (
  <Grommet>
    <Main pad="medium">
      <Box gap={'large'} margin={{ horizontal: 'auto' }} width={'50%'}>
        <Stats />
        <TxQueue />
      </Box>
    </Main>
  </Grommet>
);

export default App;

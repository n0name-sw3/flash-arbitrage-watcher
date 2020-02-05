import React from 'react';
import { Box, Meter, Table, TableBody, TableCell, TableRow, Text } from 'grommet';

const Return = () => (
  <Box fill={true} elevation={'small'} pad={'medium'}>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell align={'right'}>
            <Text>{`Aave fees :`}</Text>
          </TableCell>
          <TableCell align={'left'}>
            <Meter
              type="bar"
              max={1}
              values={[{ value: 0.35, color: 'brand' }]}
              size={'small'}
              thickness={'small'}
            />
            <Text margin={{ left: 'xsmall' }}>{'0.35%'}</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align={'right'}>
            <Text>{`Expected return on arbitrage :`}</Text>
          </TableCell>
          <TableCell align={'left'}>
            <Meter
              type="bar"
              max={1}
              values={[{ value: 0.2, color: 0.2 > 0.35 ? 'status-ok' : 'status-error' }]}
              size={'small'}
              thickness={'small'}
            />
            <Text margin={{ left: 'xsmall' }}>{'0.2%'}</Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Box>
);

export default Return;

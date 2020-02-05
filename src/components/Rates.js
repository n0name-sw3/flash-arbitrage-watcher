import React from 'react';
import { Box, Table, TableBody, TableCell, TableRow, Text } from 'grommet';
import PropTypes from 'prop-types';

const RateBox = ({ dexName, rate }) => (
  <TableRow>
    <TableCell align={'right'}>
      <Text>{`BAT/DAI rate on ${dexName} :`}</Text>
    </TableCell>
    <TableCell align={'left'}>
      <Text>{`${rate} `}</Text>
      <Text size={'small'}>{`(max slippage : 0.5%)`}</Text>
    </TableCell>
  </TableRow>
);

RateBox.propTypes = {
  dexName: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
};

const Rates = () => (
  <Box fill={true} elevation={'small'} pad={'xsmall'}>
    <Table>
      <TableBody>
        <RateBox dexName={'Uniswap'} rate={4.0456} />
        <RateBox dexName={'Kyber'} rate={4.0475} />
      </TableBody>
    </Table>
  </Box>
);

export default Rates;

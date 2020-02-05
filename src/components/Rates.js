import React from 'react';
import { connect } from 'react-redux';
import { Box, Meter, Table, TableBody, TableCell, TableRow, Text } from 'grommet';
import PropTypes from 'prop-types';
import uniswapData from '../util/uniswapData';
import kyberData from '../util/kyberData';

const MIN_RATE = Math.min(...[].concat(uniswapData, kyberData));
const MAX_RATE = Math.max(...[].concat(uniswapData, kyberData));

const RateBox = ({ dexName, rate }) => (
  <TableRow>
    <TableCell align={'right'}>
      <Text>{`1 BAT/DAI price on ${dexName} :`}</Text>
    </TableCell>
    <TableCell align={'left'}>
      <Meter
        type="bar"
        max={MAX_RATE - MIN_RATE}
        values={[{ value: rate - MIN_RATE, color: 'accent-3' }]}
        size={'small'}
        thickness={'small'}
      />
      <Text margin={{ left: 'xsmall' }}>{`${rate.toFixed(4)} `}</Text>
      <Text size={'small'}>{`(max slippage : 0.5%)`}</Text>
    </TableCell>
  </TableRow>
);

RateBox.propTypes = {
  dexName: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
};

const Rates = ({ uniswapRate, kyberRate }) => (
  <Box fill={true} elevation={'small'} pad={'xsmall'}>
    <Table>
      <TableBody>
        <RateBox dexName={'Uniswap'} rate={uniswapRate} />
        <RateBox dexName={'Kyber'} rate={kyberRate} />
      </TableBody>
    </Table>
  </Box>
);

Rates.propTypes = {
  uniswapRate: PropTypes.number.isRequired,
  kyberRate: PropTypes.number.isRequired,
};

const mapStateToProps = store => {
  return {
    uniswapRate: store.main.uniswapRate,
    kyberRate: store.main.kyberRate,
  };
};

export default connect(mapStateToProps)(Rates);

import React from 'react';
import { Box, Meter, Table, TableBody, TableCell, TableRow, Text } from 'grommet';
import { AAVE_THRESHOLD } from '../util/constants';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getRelDeltaSlippageFree from '../util/getRelDeltaSlippageFree';

const Return = ({ uniswapRate, kyberRate }) => {
  const relDeltaSlippageFree = getRelDeltaSlippageFree(uniswapRate, kyberRate);
  const shouldSwap = relDeltaSlippageFree > AAVE_THRESHOLD;
  return (
    <Box fill={true} elevation={'small'} pad={'xsmall'}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align={'right'}>
              <Text>{`Aave fees :`}</Text>
            </TableCell>
            <TableCell align={'left'}>
              <Meter
                type="bar"
                max={0.02}
                values={[{ value: AAVE_THRESHOLD, color: 'brand' }]}
                size={'small'}
                thickness={'small'}
              />
              <Text margin={{ left: 'xsmall' }}>{`${(AAVE_THRESHOLD * 100).toFixed(4)}%`}</Text>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align={'right'}>
              <Text>{`Expected return on arbitrage :`}</Text>
            </TableCell>
            <TableCell align={'left'}>
              <Meter
                type="bar"
                max={0.02}
                values={[
                  {
                    value: relDeltaSlippageFree,
                    color: shouldSwap ? 'status-ok' : 'status-error',
                  },
                ]}
                size={'small'}
                thickness={'small'}
              />
              <Text weight={'bold'} margin={{ left: 'xsmall' }}>{`${(
                relDeltaSlippageFree * 100
              ).toFixed(4)}%`}</Text>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

Return.propTypes = {
  uniswapRate: PropTypes.number.isRequired,
  kyberRate: PropTypes.number.isRequired,
};

const mapStateToProps = store => {
  return {
    uniswapRate: store.main.uniswapRate,
    kyberRate: store.main.kyberRate,
  };
};

export default connect(mapStateToProps)(Return);

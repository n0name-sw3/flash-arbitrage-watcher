import React, { Fragment } from 'react';
import { Box, Text } from 'grommet';
import TxBox from './TxBox';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TxQueue = ({ txs }) => (
  <Box fill gap="small">
    <Box fill={true} elevation={'medium'} background={'accent-2'} pad={'small'}>
      <Text textAlign={'center'} size={'large'}>
        Transaction Pool
      </Text>
    </Box>
    {txs.length ? (
      <Fragment>
        {txs.map(tx => (
          <TxBox
            txHash={tx.hash}
            sellDaiOnUniswap={tx.sellDaiOnUniswap}
            cancel={tx.cancel}
            key={tx.hash}
          />
        ))}
      </Fragment>
    ) : (
      <Box fill={true} elevation={'small'} pad={'xsmall'}>
        <Text>No transaction</Text>
      </Box>
    )}
  </Box>
);

TxQueue.propTypes = {
  txs: PropTypes.array,
};

const mapStateToProps = store => {
  return {
    txs: store.main.txs,
  };
};

export default connect(mapStateToProps)(TxQueue);

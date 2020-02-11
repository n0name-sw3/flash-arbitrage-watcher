import React, { useEffect, useState } from 'react';
import { Box, Anchor, TableCell, TableRow, Text } from 'grommet';
import { dfuseClient } from '../util/dfuse';
import streamTransactionQuery from '../util/dfuse/streamTransactionQuery';
import PropTypes from 'prop-types';

const TxBox = ({ cancel, sellDaiOnUniswap, txHash }) => {
  const [state, setState] = useState('UNKNOWN');
  const [error, setError] = useState('');

  const getBgColor = () => {
    if (error) return 'status-unknown';
    switch (state) {
      case 'IN_BLOCK':
        return 'status-ok';
      case 'REPLACED':
        return 'status-error';
      case 'PENDING':
        return 'status-warning';
      default:
        return 'status-unknown';
    }
  };

  useEffect(() => {
    (async () => {
      const stream = await dfuseClient.graphql(
        streamTransactionQuery,
        message => {
          if (message.type === 'error') {
            setError(message.errors[0].message);
          }

          if (message.type === 'data') {
            setState(message.data.transactionLifecycle.currentState);
          }
        },
        {
          variables: {
            hash: txHash,
          },
        },
      );
      await stream.join(); // awaits stream completion, which is never for this operation
    })();
  }, txHash);

  return (
    <Box background={getBgColor()} fill={true} elevation={'small'} pad={'xsmall'}>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <TableRow>
          <TableCell align={'left'}>
            <Text weight={'bold'}>{`Tx :`}</Text>{' '}
            <Anchor href={`https://ropsten.etherscan.io/tx/${txHash}`}>
              {txHash.substr(0, 8)}…
            </Anchor>
          </TableCell>
          <TableCell align={'left'}>
            <Text weight={'bold'}>{`Type :`}</Text>{' '}
            <Text>
              {cancel
                ? 'Cancel previous tx'
                : sellDaiOnUniswap
                ? 'Sell BAT on Kyber, buy on Uniswap.'
                : 'Sell BAT on Uniswap, buy on Kyber.'}
            </Text>
          </TableCell>
          <TableCell align={'left'}>
            <Text weight={'bold'}>{`State :`}</Text> <Text>{state}</Text>
          </TableCell>
        </TableRow>
      )}
    </Box>
  );
};

TxBox.propTypes = {
  txHash: PropTypes.string.isRequired,
  sellDaiOnUniswap: PropTypes.bool.isRequired,
  cancel: PropTypes.bool.isRequired,
};

export default TxBox;

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image, Table, TableBody, TableCell, TableRow, Text } from 'grommet';
import daiLogo from '../media/dai-50.png';
import batLogo from '../media/bat-50.png';

const BalanceBox = ({ currencyLogo, userBalance, aaveLiquidity }) => (
  <Box fill elevation={'small'} pad={'medium'}>
    <Image margin={{ bottom: 'small' }} src={currencyLogo} fit={'contain'} />
    <Table>
      <TableBody>
        <TableRow>
          <TableCell align={'right'}>
            <Text>User balance :</Text>
          </TableCell>
          <TableCell align={'left'}>
            <Text>{userBalance}</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align={'right'}>
            <Text>Liquidity in Aave :</Text>
          </TableCell>
          <TableCell align={'left'}>
            <Text>{aaveLiquidity}</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align={'right'}>
            <Text weight={'bold'}>Total :</Text>
          </TableCell>
          <TableCell align={'left'}>
            <Text weight={'bold'}>{userBalance + aaveLiquidity}</Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Box>
);

BalanceBox.propTypes = {
  currencyLogo: PropTypes.string.isRequired,
  userBalance: PropTypes.number.isRequired,
  aaveLiquidity: PropTypes.number.isRequired,
};

const Balances = () => (
  <Box fill gap="small" direction={'row'}>
    <BalanceBox currencyLogo={daiLogo} userBalance={15} aaveLiquidity={20} />
    <BalanceBox currencyLogo={batLogo} userBalance={54} aaveLiquidity={2} />
  </Box>
);

export default Balances;

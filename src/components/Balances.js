import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image, Table, TableBody, TableCell, TableRow, Text } from 'grommet';
import daiLogo from '../media/dai-50.png';
import batLogo from '../media/bat-50.png';

const BalanceBox = ({ currencyName, currencyLogo, userBalance, aaveLiquidity }) => (
  <Box fill elevation={'small'} pad={'xsmall'}>
    <Image margin={{ bottom: 'small' }} src={currencyLogo} fit={'contain'} />
    <Table>
      <TableBody>
        <TableRow>
          <TableCell align={'right'}>
            <Text size={'small'}>User balance :</Text>
          </TableCell>
          <TableCell align={'left'}>
            <Text size={'small'}>{`${userBalance} ${currencyName}`}</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align={'right'}>
            <Text size={'small'}>Liquidity in Aave :</Text>
          </TableCell>
          <TableCell align={'left'}>
            <Text size={'small'}>{`${aaveLiquidity} ${currencyName}`}</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align={'right'}>
            <Text>{`Total balance :`}</Text>
          </TableCell>
          <TableCell align={'left'}>
            <Text>{`${userBalance + aaveLiquidity} ${currencyName}`}</Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Box>
);

BalanceBox.propTypes = {
  currencyName: PropTypes.string.isRequired,
  currencyLogo: PropTypes.string.isRequired,
  userBalance: PropTypes.number.isRequired,
  aaveLiquidity: PropTypes.number.isRequired,
};

const Balances = () => (
  <Box fill gap="small" direction={'row'}>
    <BalanceBox currencyName={'DAI'} currencyLogo={daiLogo} userBalance={15} aaveLiquidity={20} />
    <BalanceBox currencyName={'BAT'} currencyLogo={batLogo} userBalance={54} aaveLiquidity={2} />
  </Box>
);

export default Balances;

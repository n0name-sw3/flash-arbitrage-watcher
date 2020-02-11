import React from 'react';
import { Box, Grommet, Main } from 'grommet';
import Stats from './components/Stats';
import TxQueue from './components/TxQueue';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConnexionForm from './components/ConnexionForm';

const App = ({ isInitialized }) => (
  <Grommet>
    <Main pad="medium" margin={{ horizontal: 'auto' }} width={'50%'}>
      {isInitialized ? (
        <Box gap={'large'}>
          <Stats />
          <TxQueue />
        </Box>
      ) : (
        <ConnexionForm />
      )}
    </Main>
  </Grommet>
);

App.propTypes = {
  isInitialized: PropTypes.bool.isRequired,
};

const mapStateToProps = store => {
  return {
    isInitialized: store.main.isInitialized,
  };
};

export default connect(mapStateToProps)(App);

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import kyberData from './util/kyberData';
import uniswapData from './util/uniswapData';
import getRelDeltaSlippageFree from './util/getRelDeltaSlippageFree';
import { AAVE_THRESHOLD } from './util/constants';
import { cancelFlashLoan, submitFlashLoan } from './util/web3';

const initialState = {
  isInitialized: false,
  /**
   * scenarioState
   * 0 : no arbitrage needed
   * 1 : should sell BAT on Uniswap and buy on Kyber
   * 2 : should cancel previous tx
   * 3 : should sell BAT on Kyber and buy on Uniswap
   */
  scenarioState: 0,
  ethPrivateKey: '',
  infuraKey: '',
  dfuseKey: '',
  ratesIndex: 0,
  uniswapRate: uniswapData[0],
  kyberRate: kyberData[0],
  txs: [],
};

const INITIALIZE = 'INITIALIZE';
const initialize = (ethPrivateKey, infuraKey, dfuseKey) => ({
  type: INITIALIZE,
  payload: { ethPrivateKey, infuraKey, dfuseKey },
});

const UPDATE_RATES = 'UPDATE_RATES';
const updateRates = () => ({
  type: UPDATE_RATES,
  payload: {},
});

const ADD_TX = 'ADD_TX';
const addTx = (hash, sellDaiOnUniswap, cancel) => ({
  type: ADD_TX,
  payload: { hash, sellDaiOnUniswap, cancel },
});

const mainReducer = (state = initialState, action) => {
  let ratesIndex, uniswapRate, kyberRate, txs, relDeltaSlippageFree, shouldSwap, scenarioState;
  switch (action.type) {
    case INITIALIZE:
      return Object.assign({}, state, {
        isInitialized: true,
        ethPrivateKey: action.payload.ethPrivateKey,
        infuraKey: action.payload.infuraKey,
        dfuseKey: action.payload.dfuseKey,
      });
    case ADD_TX:
      txs = state.txs;
      txs.unshift({
        hash: action.payload.hash,
        sellDaiOnUniswap: action.payload.sellDaiOnUniswap,
        cancel: action.payload.cancel,
      });
      return Object.assign({}, state, {
        txs: txs.slice(),
      });
    case UPDATE_RATES:
      ratesIndex = state.ratesIndex + 1;
      uniswapRate =
        ratesIndex < uniswapData.length
          ? uniswapData[ratesIndex]
          : uniswapData[uniswapData.length - 1] + Math.random() * 0.01;
      kyberRate =
        ratesIndex < kyberData.length
          ? kyberData[ratesIndex]
          : kyberData[kyberData.length - 1] + Math.random() * 0.01;

      relDeltaSlippageFree = getRelDeltaSlippageFree(uniswapRate, kyberRate);
      shouldSwap = relDeltaSlippageFree > AAVE_THRESHOLD;
      scenarioState = state.scenarioState;
      if (scenarioState === 0 && shouldSwap && uniswapRate > kyberRate) {
        scenarioState = 1;
        submitFlashLoan(false);
      } else if (scenarioState === 1 && !shouldSwap && uniswapRate > kyberRate) {
        scenarioState = 2;
        cancelFlashLoan();
      } else if (scenarioState === 2 && shouldSwap && uniswapRate < kyberRate) {
        scenarioState = 3;
        submitFlashLoan(true);
      }
      return Object.assign({}, state, {
        scenarioState,
        ratesIndex,
        uniswapRate,
        kyberRate,
      });
    default:
      return state;
  }
};

const reducer = combineReducers({
  main: mainReducer,
});

export function configureStore(initialState = {}) {
  // Middleware and store enhancers
  const enhancers = [applyMiddleware(thunk)];

  let store;
  if (process.env.NODE_ENV === 'development') {
    store = createStore(reducer, initialState, composeWithDevTools(...enhancers));
  } else {
    store = createStore(reducer, initialState, compose(...enhancers));
  }

  return store;
}

export { updateRates, initialize, addTx };

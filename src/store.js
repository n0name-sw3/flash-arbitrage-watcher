import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import kyberData from './util/kyberData';
import uniswapData from './util/uniswapData';

const initialState = {
  ratesIndex: 0,
  uniswapRate: uniswapData[0],
  kyberRate: kyberData[0],
};

const UPDATE_RATES = 'UPDATE_RATES';
const updateRates = () => ({
  type: UPDATE_RATES,
  payload: {},
});

const mainReducer = (state = initialState, action) => {
  let ratesIndex, uniswapRate, kyberRate;
  switch (action.type) {
    case UPDATE_RATES:
      console.log(state);
      ratesIndex = state.ratesIndex + 1;
      console.log(ratesIndex);
      uniswapRate =
        ratesIndex < uniswapData.length
          ? uniswapData[ratesIndex]
          : uniswapData[uniswapData.length - 1] + Math.random() * 0.01;
      console.log(uniswapRate);
      kyberRate =
        ratesIndex < kyberData.length
          ? kyberData[ratesIndex]
          : kyberData[kyberData.length - 1] + Math.random() * 0.01;
      console.log(kyberRate);
      return Object.assign({}, state, {
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

export { updateRates };

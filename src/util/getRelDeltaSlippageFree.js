import { SLIPPAGE_RATE } from './constants';

const getRelDeltaSlippageFree = (uniswapRate, kyberRate) => {
  const delta = Math.abs(uniswapRate - kyberRate);
  const relDelta = delta / Math.max(uniswapRate, kyberRate);
  return Math.max(0, relDelta - SLIPPAGE_RATE * 2);
};

export default getRelDeltaSlippageFree;

import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from './store';

const store = configureStore(window.__INITIAL_STATE__);

describe('rendering', () => {
  it('renders App', () => {
    expect.hasAssertions();
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    const linkElement = getByText(/transaction pool/i);
    expect(linkElement).toBeInTheDocument();
  });
});

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from '../App';

test('renders without crashing', async () => {
  const screen = render(<App />);

  await waitFor(() => {
    expect(screen).toBeTruthy();
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';
import SafeImage from './SafeImage';

test('SafeImage renders without crashing', () => {
  const imageUrl = 'https://example.com/image.png';
  const { getByTestId } = render(<SafeImage source={imageUrl} />);

  expect(getByTestId('safe-image')).toBeTruthy();
});

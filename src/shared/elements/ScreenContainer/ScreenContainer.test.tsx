/**
 * ScreenContainer Tests
 *
 * Smoke test – verifies the component renders without crashing
 * and passes children through correctly.
 */

import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import ScreenContainer from './ScreenContainer';

describe('ScreenContainer – smoke', () => {
  it('renders without crashing', () => {
    render(
      <ScreenContainer>
        <Text>Hello</Text>
      </ScreenContainer>,
    );
  });

  it('renders its children', () => {
    render(
      <ScreenContainer>
        <Text>Inside container</Text>
      </ScreenContainer>,
    );
    expect(screen.getByText('Inside container')).toBeTruthy();
  });
});

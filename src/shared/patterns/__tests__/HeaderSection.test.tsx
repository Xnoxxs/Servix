/**
 * HeaderSection Tests
 *
 * Smoke test – verifies the component renders without crashing
 * and displays the expected brand text.
 */

import { render, screen } from '@testing-library/react-native';
import HeaderSection from '../HeaderSection';

describe('HeaderSection – smoke', () => {
  it('renders without crashing', () => {
    render(<HeaderSection />);
  });

  it('displays the app name', () => {
    render(<HeaderSection />);
    expect(screen.getByText('Servix')).toBeTruthy();
  });

  it('displays the tagline', () => {
    render(<HeaderSection />);
    expect(screen.getByText('Find local services')).toBeTruthy();
  });
});

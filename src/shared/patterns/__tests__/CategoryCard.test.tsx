/**
 * CategoryCard Tests
 *
 * Smoke test – verifies the component renders without crashing
 * and displays the category name.
 */

import { render, screen } from '@testing-library/react-native';
import CategoryCard from '../CategoryCard';

describe('CategoryCard – smoke', () => {
  it('renders without crashing', () => {
    render(<CategoryCard name="Plumbing" />);
  });

  it('displays the category name', () => {
    render(<CategoryCard name="Electrical" />);
    expect(screen.getByText('Electrical')).toBeTruthy();
  });
});

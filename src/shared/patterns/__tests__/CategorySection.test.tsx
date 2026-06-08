/**
 * CategorySection Tests
 *
 * Smoke test – verifies the component renders without crashing
 * and shows the section title and all category items.
 */

import { render, screen } from '@testing-library/react-native';
import CategorySection from '../CategorySection';

const categories = ['Plumbing', 'Electrical', 'Cleaning'];

describe('CategorySection – smoke', () => {
  it('renders without crashing', () => {
    render(<CategorySection title="Services" categories={categories} />);
  });

  it('displays the section title', () => {
    render(
      <CategorySection title="Popular Services" categories={categories} />,
    );
    expect(screen.getByText('Popular Services')).toBeTruthy();
  });

  it('renders all category items', () => {
    render(<CategorySection title="Services" categories={categories} />);
    categories.forEach((name) => {
      expect(screen.getByText(name)).toBeTruthy();
    });
  });

  it('renders with an empty categories list', () => {
    render(<CategorySection title="Services" categories={[]} />);
    expect(screen.getByText('Services')).toBeTruthy();
  });
});

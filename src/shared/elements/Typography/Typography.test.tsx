/**
 * Typography Tests
 *
 * Smoke test – verifies the component renders without crashing
 * across all available variants.
 */

import { render, screen } from '@testing-library/react-native';
import Typography from './Typography';

describe('Typography – smoke', () => {
  it('renders without crashing (default variant)', () => {
    render(<Typography>Hello world</Typography>);
  });

  it('displays the text content', () => {
    render(<Typography>Welcome</Typography>);
    expect(screen.getByText('Welcome')).toBeTruthy();
  });

  // Verify each variant renders without crashing
  const variants = ['heading', 'title', 'label', 'body', 'caption'] as const;

  variants.forEach((variant) => {
    it(`renders the "${variant}" variant without crashing`, () => {
      render(<Typography variant={variant}>Sample text</Typography>);
      expect(screen.getByText('Sample text')).toBeTruthy();
    });
  });
});

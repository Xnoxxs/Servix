/**
 * ProviderCard Integration Tests
 *
 * Integration test – renders the full component and verifies:
 *   1. Provider name is visible
 *   2. Rating is visible
 *   3. Pressing the favorite button calls onToggleFavorite with the provider id
 *   4. The favorite icon reflects the isFavorite prop
 */

import { render, screen, userEvent } from '@testing-library/react-native';
import ProviderCard from './ProviderCard';

const baseProps = {
  id: 'provider-1',
  name: 'Alice Johnson',
  rating: 4.8,
  isFavorite: false,
  onToggleFavorite: jest.fn(),
};

beforeEach(() => {
  // Reset the mock before each test so call counts don't bleed between tests
  baseProps.onToggleFavorite.mockReset();
});

describe('ProviderCard – integration', () => {
  it('renders without crashing', () => {
    render(<ProviderCard {...baseProps} />);
  });

  it('displays the provider name', () => {
    render(<ProviderCard {...baseProps} />);
    expect(screen.getByText('Alice Johnson')).toBeTruthy();
  });

  it('displays the provider rating', () => {
    render(<ProviderCard {...baseProps} />);
    // Rating is rendered as "Rating: 4.8 ★"
    expect(screen.getByText(/4\.8/)).toBeTruthy();
  });

  it('shows the unfilled heart when not a favorite', () => {
    render(<ProviderCard {...baseProps} isFavorite={false} />);
    expect(screen.getByText('♡')).toBeTruthy();
  });

  it('shows the filled heart when marked as favorite', () => {
    render(<ProviderCard {...baseProps} isFavorite={true} />);
    expect(screen.getByText('♥')).toBeTruthy();
  });

  it('calls onToggleFavorite with the correct id when the heart is pressed', async () => {
    render(<ProviderCard {...baseProps} isFavorite={false} />);

    // Simulate the user tapping the favorite button
    await userEvent.press(screen.getByText('♡'));

    expect(baseProps.onToggleFavorite).toHaveBeenCalledTimes(1);
    expect(baseProps.onToggleFavorite).toHaveBeenCalledWith('provider-1');
  });

  it('calls onPress with the correct id when the card body is pressed', async () => {
    const onPress = jest.fn();
    render(<ProviderCard {...baseProps} onPress={onPress} />);

    await userEvent.press(screen.getByText('Alice Johnson'));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith('provider-1');
  });

  it('does not call onPress when the heart is pressed', async () => {
    const onPress = jest.fn();
    render(
      <ProviderCard {...baseProps} onPress={onPress} isFavorite={false} />,
    );

    await userEvent.press(screen.getByText('♡'));

    expect(onPress).not.toHaveBeenCalled();
    expect(baseProps.onToggleFavorite).toHaveBeenCalledWith('provider-1');
  });
});

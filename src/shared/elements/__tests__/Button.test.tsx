/**
 * Button Tests
 *
 * Covers:
 *   1. Smoke test   – verifies the component renders without crashing
 *   2. Unit test    – verifies the correct label is displayed
 *   3. Mock + action – mocks onPress and simulates a press event
 */

import { render, screen, userEvent } from '@testing-library/react-native';
import Button from '../Button';

// ─── Smoke Test ────────────────────────────────────────────────────────────

describe('Button – smoke', () => {
  it('renders without crashing', () => {
    render(<Button label="Submit" onPress={() => {}} />);
  });
});

// ─── Unit Tests ────────────────────────────────────────────────────────────

describe('Button – unit', () => {
  it('displays the label text', () => {
    render(<Button label="Book Now" onPress={() => {}} />);
    // getByText throws if the text is not found, so this also acts as an assertion
    expect(screen.getByText('Book Now')).toBeTruthy();
  });

  it('renders with the outline variant without crashing', () => {
    render(<Button label="Cancel" onPress={() => {}} variant="outline" />);
    expect(screen.getByText('Cancel')).toBeTruthy();
  });
});

// ─── Mock Function + User Action ───────────────────────────────────────────

describe('Button – interactions', () => {
  it('calls onPress when the button is pressed', async () => {
    // jest.fn() creates a mock function that records every call made to it
    const onPress = jest.fn();

    render(<Button label="Press me" onPress={onPress} />);

    // userEvent simulates a real user pressing the button
    await userEvent.press(screen.getByText('Press me'));

    // Verify the callback was invoked exactly once
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

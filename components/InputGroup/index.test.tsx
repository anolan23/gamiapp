import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputGroup from '.';

let input: HTMLInputElement;

beforeEach(async () => {
  render(<InputGroup label="First name" name="first-name" error="Error" />);
  input = screen.getByLabelText('First name');
});

describe('Input Group', () => {
  it('can change input value', async () => {
    const user = userEvent.setup();
    await user.type(input, 'Oh yeah baby!');
    expect(input.value).toBe('Oh yeah baby!');
  });
  it('can display error message', () => {
    const error = screen.getByText('Error');
    expect(error).toBeDefined();
  });
});

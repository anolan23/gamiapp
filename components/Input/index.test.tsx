import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '.';

describe('Input', () => {
  it('can change value', async () => {
    const user = userEvent.setup();
    render(<Input />);
    const input = screen.getByRole<HTMLInputElement>('textbox');
    await user.type(input, 'Oh yeah baby!');
    expect(input.value).toBe('Oh yeah baby!');
  });
});

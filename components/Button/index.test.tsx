import { render, screen } from '@testing-library/react';
import Button from '.';

describe('Button', () => {
  it('renders button text', () => {
    render(<Button text="Click me!" />);

    const button = screen.getByRole('button', {
      name: 'Click me!',
    });

    expect(button.textContent).toEqual('Click me!');
  });
});

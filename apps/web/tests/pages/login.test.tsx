// __tests__/index.test.jsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import LoginPage from '@pages/login/index';

describe('Home', () => {
  it('renders a heading', () => {
    render(<LoginPage />);

    const page = screen.getByTestId('page');
    expect(page).toBeInTheDocument();
  });
});

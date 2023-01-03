import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { Naver } from './Naver';

describe('< Naver />', () => {
  const onClick = jest.fn();

  beforeEach(() => {
    render(<Naver onClick={onClick} />);
  });

  afterEach(cleanup);

  it('네이버 버튼을 누르면 Router.push가 호출되어야 한다.', () => {
    const naver = screen.getByRole('link');
    fireEvent.click(naver);

    expect(onClick).toHaveBeenCalled();
  });
});

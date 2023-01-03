import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { Kakao } from './Kakao';

describe('< Kakao />', () => {
  const onClick = jest.fn();

  beforeEach(() => {
    render(<Kakao onClick={onClick} />);
  });

  afterEach(cleanup);

  it('카카오 버튼을 누르면 Router.push가 호출되어야 한다.', () => {
    const kakao = screen.getByRole('link');
    fireEvent.click(kakao);

    expect(onClick).toHaveBeenCalled();
  });
});

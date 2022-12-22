// __tests__/index.test.jsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import LoginPage from '@pages/login/index';

describe('LoginPage', () => {
  beforeEach(() => {
    render(<LoginPage />);
  });
  it('렌더링이 완료되면 페이지 섹션이 나와야 한다.', () => {
    const page = screen.getByTestId('page');
    expect(page).toBeInTheDocument();
  });

  // NOTE: 테스트 코드 설정 완료 후 지울 것.
  /* eslint-disable @typescript-eslint/no-empty-function */
  describe('LoginForm', () => {
    it('Inputs: 아이디, 패스워드 인풋이 존재해야 한다.', () => {
      const idInput = screen.getByTestId('id-input');
      const pwInput = screen.getByTestId('password-input');

      expect(idInput).toBeInTheDocument();
      expect(pwInput).toBeInTheDocument();
    });

    it('Inputs: 아이디 인풋에는 "이메일 ID"라는 문구가 나와야 한다.', () => {
      const idInput = screen.getByTestId('id-input');

      expect(idInput).toHaveAttribute('placeholder', '이메일 ID');
    });

    it('Inputs: 아이디 인풋에는 "패스워드 ID"라는 문구가 나와야 한다.', () => {
      const pwInput = screen.getByTestId('password-input');

      expect(pwInput).toHaveAttribute('placeholder', '비밀번호');
    });

    fit('스크린 리더에서는 아이디와 테스트를 입력하라는 문구가 나오도록 한다.', () => {});

    fit('Link: 회원가입 링크가 존재해야 한다.', () => {});
    fit('Link: 회원가입 링크를 누르면 회원가입 페이지로 이동되어야 한다.', () => {});
    fit('Buttons: 네이버, 카카오, 로그인 버튼이 존재해야 한다.', () => {});
    // NOTE: 아직 정해진 명세가 없으므로 임의의 길이 및 이메일 형식 유효성 검사만 실시한다.
    fit('LoginButton: 아이디와 패스워드 둘 다 제대로 입력이 되지 않았다면 로그인 버튼이 비활성화되어야 한다.', () => {});
    fit('Form: 로그인이 실패했다면 에러메시지가 화면 상에서 표시되어야 한다.', () => {});
    fit('Form: 로그인이 성공했다면 로그인 페이지로 이동되어야 한다.', () => {});
  });
});

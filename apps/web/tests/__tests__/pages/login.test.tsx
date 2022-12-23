// __tests__/index.test.jsx
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

import LoginPage from '@pages/login';

import { CustomThemeProvider } from '@ui/styles';

afterEach(cleanup);

export const Login = () => {
  return (
    <CustomThemeProvider>
      <LoginPage />
    </CustomThemeProvider>
  );
};

describe('LoginPage', () => {
  let idInput: null | HTMLElement;
  let pwInput: null | HTMLElement;

  let loginButton: null | HTMLElement;

  let user: undefined | UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    render(<Login />);

    idInput = screen.getByTestId('id-input');
    pwInput = screen.getByTestId('password-input');
    loginButton = screen.getByTestId('login-button');
  });

  it('렌더링이 완료되면 페이지 섹션이 나와야 한다.', () => {
    const page = screen.getByTestId('page');
    expect(page).toBeInTheDocument();
  });

  // NOTE: 테스트 코드 설정 완료 후 지울 것.
  /* eslint-disable @typescript-eslint/no-empty-function */
  describe('LoginForm', () => {
    it('Inputs: 아이디, 패스워드 인풋이 존재해야 한다.', () => {
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

    it('Link: 회원가입 링크가 존재해야 한다.', () => {
      const link = screen.getByLabelText('회원가입 링크');
      expect(link).toBeInTheDocument();
    });

    it('Button: 로그인 버튼이 존재해야 한다.', () => {
      expect(loginButton).toBeInTheDocument();
    });

    it('스크린 리더에서는 아이디와 테스트를 입력하라는 문구가 나오도록 한다.', () => {
      const screenReaderHiddenText = screen.getByText(
        '로그인 페이지입니다. 아이디와 비밀번호를 입력해주세요!'
      );
      expect(screenReaderHiddenText).toBeInTheDocument();
    });

    // fit('Link: 회원가입 링크를 누르면 회원가입 페이지로 이동되어야 한다.', () => {});

    it('Link: 아이콘 버튼 형태의 네이버, 카카오, 로그인 링크가 존재해야 한다.', () => {
      const naverButton = screen.getByRole('link', { name: '네이버 로그인 링크' });
      const kakaoButton = screen.getByRole('link', { name: '카카오 로그인 링크' });

      expect(naverButton).toBeInTheDocument();
      expect(kakaoButton).toBeInTheDocument();
    });

    // NOTE: 아직 정해진 명세가 없으므로 임의의 길이 및 이메일 형식 유효성 검사만 실시한다.
    it('LoginButton: 아이디와 패스워드 둘 다 제대로 입력이 되지 않았다면 로그인 버튼이 비활성화되어야 한다.', async () => {
      if (!idInput || !pwInput) {
        expect(idInput).toThrow('ID Input이 없습니다');
        expect(pwInput).toThrow('비밀번호 Input이 없습니다.');
        return;
      }

      expect(loginButton).toBeDisabled();
    });

    it('LoginButton: 모두 입력이 되었다면 버튼이 활성화되어야 한다.', async () => {
      if (!user) {
        throw new Error('🚨 CHECK USEREVENT.');
        return;
      }
      if (!idInput || !pwInput) {
        expect(idInput).toThrow('ID Input이 없습니다');
        expect(pwInput).toThrow('비밀번호 Input이 없습니다.');
        return;
      }

      await user.type(idInput, 'test@test.test');
      await user.type(pwInput, 'seeyouletter');

      expect(loginButton).not.toBeDisabled();
    });

    // fit('Form: 로그인이 실패했다면 에러메시지가 화면 상에서 표시되어야 한다.', () => {});
    // fit('Form: 로그인이 성공했다면 로그인 페이지로 이동되어야 한다.', () => {});
  });
});

// __tests__/index.test.jsx
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockRouter } from 'tests/__mocks__/router';
import { UserEventType } from 'tests/types';

import { useRouter } from 'next/router';

import LoginPage from '@pages/login';

import { CustomThemeProvider } from 'ui';

import { LoginFormButton } from '@templates/form/LoginForm';

afterEach(cleanup);

export const Login = () => {
  return (
    <CustomThemeProvider>
      <LoginPage />
    </CustomThemeProvider>
  );
};

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: createMockRouter,
}));

describe('LoginPage', () => {
  let idInput: null | HTMLElement;
  let pwInput: null | HTMLElement;

  let result: ReturnType<typeof render>;

  let loginFormButton: null | HTMLElement;

  let user: UserEventType;

  const throwUserCheckMessage = (user: UserEventType) => {
    if (!user) {
      throw new Error('🚨 CHECK USEREVENT.');
    }
  };

  beforeEach(() => {
    user = userEvent.setup();
    result = render(<Login />);

    idInput = screen.getByTestId('id-input');
    pwInput = screen.getByTestId('password-input');
    loginFormButton = screen.getByTestId('login-button');

    if (!user) throwUserCheckMessage(user);
  });

  afterEach(() => {
    cleanup();
    result.unmount();
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

    it('Inputs: 비밀번호 인풋에는 "패스워드 ID"라는 문구가 나와야 한다.', () => {
      const pwInput = screen.getByTestId('password-input');

      expect(pwInput).toHaveAttribute('placeholder', '비밀번호');
    });

    it('Inputs: 아이디 인풋은 사용자 입력 시 함수가 호출되어야 한다.', async () => {
      try {
        if (!user) {
          throwUserCheckMessage(user);
          return;
        }

        if (!idInput) {
          expect(idInput).toThrow('ID Input이 없습니다');
          return;
        }

        await user.type(idInput as HTMLInputElement, 'test@test.test');
      } catch (e) {
        /* eslint-disable-next-line no-console */
        console.error(e);
      }
    });

    it('Link: 회원가입 링크가 존재해야 한다.', () => {
      const link = screen.getByLabelText('회원가입 링크');
      expect(link).toBeInTheDocument();
    });

    it('Link: 회원가입 링크는 회원가입 페이지의 href가 주어져야 한다.', () => {});

    it('Button: 로그인 버튼이 존재해야 한다.', () => {
      expect(loginFormButton).toBeInTheDocument();
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
    it('LoginFormButton: 아이디와 패스워드 둘 다 제대로 입력이 되지 않았다면 로그인 버튼이 비활성화되어야 한다.', async () => {
      if (!idInput || !pwInput) {
        expect(idInput).toThrow('ID Input이 없습니다');
        expect(pwInput).toThrow('비밀번호 Input이 없습니다.');
        return;
      }

      expect(loginFormButton).toBeDisabled();
    });

    it('LoginFormButton: 모두 입력이 되었다면 버튼이 활성화되어야 한다.', async () => {
      if (!user) {
        throwUserCheckMessage(user);
        return;
      }

      if (!idInput || !pwInput) {
        expect(idInput).toThrow('ID Input이 없습니다');
        expect(pwInput).toThrow('비밀번호 Input이 없습니다.');
        return;
      }

      await user.type(idInput, 'test@test.test');
      await user.type(pwInput, 'seeyouletter');

      expect(loginFormButton).not.toBeDisabled();
    });

    it('로그인 요청이 실페하면 에러 메시지가 화면 상에 나와야 한다.', () => {});
  });
});

describe('LoginFormButton: ', () => {
  const mockRouter = useRouter();

  const login = jest.fn();

  const onSubmit = jest.fn(async () => {
    try {
      await login();
      mockRouter.push('/');
    } catch (e) {
      /* eslint-disable */
      return { isError: true, message: e };
    }
  });

  beforeEach(() => {
    render(
      <>
        <LoginFormButton data-testid="login-button" disabled={false} onSubmit={onSubmit}>
          이메일로 로그인하기
        </LoginFormButton>
      </>
    );
  });

  it('로그인 폼 버튼이 활성화 되고 클릭을 하면 onSubmit 함수가 호출되어야 한다.', () => {
    const loginFormButton = screen.getByTestId('login-button');

    fireEvent.click(loginFormButton);

    expect(onSubmit).toHaveBeenCalled();
  });

  it('로그인 요청이 성공하면 페이지가 기본 페이지로 이동되어야 한다.', () => {
    const loginFormButton = screen.getByTestId('login-button');

    fireEvent.click(loginFormButton);

    // ...
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});

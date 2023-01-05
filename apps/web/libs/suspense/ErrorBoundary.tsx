import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';

type KeysType = unknown[];

type RenderFallbackPropsType<ErrorType extends Error = Error> = {
  error: ErrorType;
  reset: () => void;
};

type RenderFallbackType = <ErrorType extends Error>(
  props: RenderFallbackPropsType<ErrorType>
) => ReactNode;

interface Props extends PropsWithChildren {
  resetKeys: KeysType;
  renderFallback: RenderFallbackType;
  resetCallback?: () => void;
}

interface State {
  error: Error | null;
  hasError: boolean;
}

const initialState: State = {
  error: null,
  hasError: false,
};

export class ErrorBoundary extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { error, hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    /* eslint-disable-next-line no-console */
    console.error(error, errorInfo);
  }

  public isKeysChanged(nowArray: KeysType, compareArray: KeysType) {
    return JSON.stringify(nowArray) !== JSON.stringify(compareArray);
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.state.hasError === false) {
      return;
    }

    if (this.isKeysChanged(prevProps.resetKeys, this.props.resetKeys)) {
      // Trigger Reset
      this.resetErrorBoundary();
    }
  }

  public resetErrorBoundary() {
    // ErrorBoundary state를 초기화
    this.setState(initialState);

    if (this.props.resetCallback) {
      this.props.resetCallback();
    }
  }

  public render() {
    const { children, renderFallback } = this.props;

    const { error, hasError } = this.state;

    if (hasError && error) {
      return renderFallback({
        error,
        reset: this.resetErrorBoundary,
      });
    }

    return children;
  }
}

export default ErrorBoundary;

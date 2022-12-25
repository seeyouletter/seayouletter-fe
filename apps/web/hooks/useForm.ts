import { useEffect, useState } from 'react';

type SubmitCallbackType<ReturnValue> = () => ReturnValue | Promise<ReturnValue>;
type ValidatorType = () => boolean | Promise<boolean>;

/**
 * TODO
 * 현재 값을 여러 개 받을 수 있도록 any와 인덱스 시그니처로 설정했다.
 * 이를 좀 더 안정화시킬 방안을 연구한다.
 */

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
interface StateInterface<ValueType = any> {
  [Key: string]: {
    value: ValueType;
    validator?: null | ValidatorType;
    errorMessage?: string;
  };
}

interface UseFormParamsInterface<Category> {
  initialState: StateInterface<Category>;
}

interface ErrorsInterface {
  [Key: string]: ErrorInterface;
}

interface ErrorInterface {
  isError: boolean;
  message?: string;
}

export const useForm = <Category>({ initialState }: UseFormParamsInterface<Category>) => {
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState<ErrorsInterface>({});

  useEffect(() => {
    Object.keys(initialState).forEach((key) => {
      errors[key] = {
        isError: false,
        message: '',
      };
    });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const onSubmit = async <CallbackReturnValue>(
    cb: SubmitCallbackType<CallbackReturnValue>,
    message = ''
  ) => {
    try {
      if (!onVarify()) return { isError: true, errorMessage: message };
      await cb();
    } catch (e) {
      /* eslint-disable-next-line no-console */
      console.error(e);
      return { isError: true, errorMessage: e };
    }
  };

  async function varifyFn(key: keyof typeof formState, cb: ValidatorType): Promise<ErrorInterface> {
    try {
      const result = await cb();
      return {
        isError: result === false,
        message: result === true ? '' : formState[key].errorMessage ?? `Invalid ${key} value.`,
      };
    } catch (e) {
      return { isError: true, message: formState[key].errorMessage ?? `Invalid ${key} value.` };
    }
  }

  const onVarify = (keys?: (keyof typeof formState)[]) => {
    let isValid = true;

    Object.entries(formState).forEach(async ([key, value]) => {
      if (keys?.length) {
        if (!(key in keys)) return;
      }

      const validator = value.validator;
      if (!validator) return;

      const res = await varifyFn(key, validator);
      if (res.isError) isValid = false;

      setErrors((state) => ({
        ...state,
        [key]: res,
      }));
    });

    return isValid;
  };

  const isFormValid = Object.values(errors).every((v) => v);

  const updateFormState = (
    key: keyof typeof formState,
    value: typeof formState[typeof key]['value'],
    checkValid = false
  ) => {
    setFormState((state) => ({
      ...state,
      [key]: {
        ...state[key],
        value,
      },
    }));

    if (checkValid) {
      const { validator } = formState[key];

      if (validator) {
        onVarify([key]);
      }
    }
  };

  return {
    formState,
    updateFormState,
    errors,
    setErrors,
    onVarify,
    isFormValid,
    onSubmit,
  };
};

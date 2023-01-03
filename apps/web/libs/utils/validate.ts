import { ZodType } from 'zod';

export interface ValidateParam<V> {
  prerequisites?: boolean;
  prerequisitesMessage?: string;
  value: V;
  schema: unknown;
}

export interface ValidateReturnType {
  success: boolean;
  error: null | string;
}

export const validate = <V>({
  prerequisites,
  prerequisitesMessage,
  value,
  schema,
}: ValidateParam<V>): ValidateReturnType => {
  const res = (schema as ZodType).safeParse(value);

  if (prerequisites === false) {
    return { success: false, error: prerequisitesMessage ?? null };
  }

  if (res.success) {
    return { success: res.success, error: null };
  } else {
    return { success: res.success, error: res.error.errors[0].message };
  }
};

import React from 'react';

import { FormControl } from '@chakra-ui/react';

import { FormPropsInterface } from './types';

export function Form({
  isDisabled = false,
  isInvalid = false,
  isRequired = false,
  children,
  ...props
}: FormPropsInterface) {
  return (
    <FormControl {...props} isDisabled={isDisabled} isInvalid={isInvalid} isRequired={isRequired}>
      {children}
    </FormControl>
  );
}

import { DefaultHStack } from './HStack';
import { DefaultVStack } from './VStack';
import { StackFactoryPropsInterface } from './types';

export const StackFactory = ({ direction, container, children }: StackFactoryPropsInterface) => {
  return direction === 'vertical' ? (
    <DefaultVStack {...container}>{children}</DefaultVStack>
  ) : (
    <DefaultHStack {...container}>{children}</DefaultHStack>
  );
};

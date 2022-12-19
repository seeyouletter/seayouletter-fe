import React from 'react';

import { Select } from '@chakra-ui/react';

import { SelectPropsInterface } from './types';

/**
 * @description
 * 컴포넌트 이름이 Mobile인 이유는, `Select` 컴포넌트를 디바이스에 따라 분리하기 위함입니다.
 * 이유: 모바일에서 select - option Tag는 상당한 UX 강점을 제공합니다.
 * `chakra-ui`의 경우 이러한 시멘틱 태그를 따르므로 모바일에서는 강점이 분명 있습니다.
 *
 * 그러나 애석하게도 데스크탑에서는 이것이 오점으로 남습니다. 특히 크로스 브라우징에서의 아쉬움이 존재합니다.
 * 일관성 있는 디자인 시스템 사이에서 파란색으로 option이 나오는 부분은 우스꽝스럽기도 합니다.
 * 따라서 현재는 구현하기 쉬운 모바일 버전의 셀렉트를 구현하고, 추후 별개로 구현하려 합니다.
 *
 * @see: 다음은 Select-option의 스타일 지정이 까다로운 이유를 설명합니다.
 * https://stackoverflow.com/questions/7208786/how-to-style-the-option-of-an-html-select-element
 *
 * @see: 또다른 데스크톱에서 쓸만한 컴포넌트를 찾았습니다.
 * https://github.com/csandman/chakra-react-select
 */
export const Mobile = ({ options, placeholder }: SelectPropsInterface) => {
  return (
    <Select placeholder={placeholder} variant="outline" color="sub.500" borderColor="sub.500">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

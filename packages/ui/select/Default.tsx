import React from 'react';

import { Mobile } from './Mobile';
import { SelectPropsInterface } from './types';

/**
 *
 * @param {options, placeholder}
 * @returns Select.Mobile (현재는 Mobile에 관한 Select만 우선적으로 구현합니다.)
 */
export const DefaultSelect = ({
  width = '84px',
  height = '32px',
  size = 'sm',
  options = [],
  placeholder,
  onChange,
  activeOption,
  selectType = 'outline',
  borderRadius,
  color,
}: SelectPropsInterface) => {
  return (
    <Mobile
      selectType={selectType}
      width={width}
      height={height}
      size={size}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      activeOption={activeOption}
      borderRadius={borderRadius}
      color={color}
    />
  );
};

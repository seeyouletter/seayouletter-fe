export const convertPxStringToNumber = (value: string) => {
  return +value.replace(/[^0-9]/g, '');
};

export const restorePxString = (value: number) => {
  return value + 'px';
};

export const convertPercentStringToNumber = (value: string, cmp: number) => {
  const refinedNumberValue = +value.replace(/[^0-9]/g, '');

  return (refinedNumberValue / 100) * cmp;
};

export const restorePercentString = (value: number, cmp: number) => {
  if (cmp === 0) return Infinity;

  return (value / cmp) * 100 + '%';
};

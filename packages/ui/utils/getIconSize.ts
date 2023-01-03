interface GetIconSizeParam {
  originalWidth: number;
  originalHeight: number;
  size: string;
}

export const getIconSize = ({ originalWidth, originalHeight, size }: GetIconSizeParam) => {
  const newHeight = +size.replace(/[^0-9.]/g, '');
  const nextWidth = (newHeight / originalHeight) * originalWidth;

  return {
    width: `${nextWidth}px`,
    height: `${size}px`,
  };
};

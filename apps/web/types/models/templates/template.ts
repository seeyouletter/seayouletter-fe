import { ImageInterface, Like } from '@ui/types';

export interface TemplateResponse extends ImageInterface, Like {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  nickname: string;
  authorProfileUrl: string;
}

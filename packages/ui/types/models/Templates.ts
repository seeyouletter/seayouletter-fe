import { Like } from './Like';

export interface RecommendTemplateItem {
  id: string;
  thumbnail: string;
  description: string;
  title: string;
  like: Like;
  createAt: Date;
  updateAt: Date;
}

export interface MyTemplateItem {
  title: string;
  description: string; // 구분을 위한 상세 설명을 작성할 수 있도록 합니다.
  createAt: Date;
  updateAt: Date;
  thumbnail: string;
}

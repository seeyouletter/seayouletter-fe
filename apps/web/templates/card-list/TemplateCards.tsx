import { request } from 'libs/apis/API';

import React from 'react';

const postsPromise = request.withSuspense(
  request.get<{ posts: { id: number; body: string }[] }>('https://dummyjson.com/posts')
);

export function TemplateCards() {
  const data = postsPromise.read();
  return <div>{data && data.posts.map((v) => <div key={v.id}>{v.body}</div>)}</div>;
}

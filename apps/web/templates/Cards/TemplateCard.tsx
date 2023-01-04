import React from 'react';

export function wrapPromise<ResponseType>(promise: Promise<Response>) {
  let status: keyof typeof handler = 'pending';
  let response: ResponseType | null = null;
  let error: Error | null = null;

  const suspender = promise
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('error');
    })
    .then((res: ResponseType) => {
      status = 'success';
      response = res;
    })
    .catch((e: Error) => {
      status = 'error';
      error = e;
    });

  const handler = {
    pending() {
      throw suspender;
    },
    error() {
      throw error;
    },
    success(): ResponseType {
      return response as ResponseType;
    },
    default() {
      return response;
    },
  };

  const read = () => {
    const result = handler[status] ? handler[status]() : handler.default();
    return result;
  };

  return { read };
}

const postsPromise = wrapPromise<{ posts: { id: number; body: string }[] }>(
  fetch('https://dummyjson.com/posts')
);

export function TemplateCard() {
  const data = postsPromise.read();

  return <div>{data && data.posts.map((v) => <div key={v.id}>{v.body}</div>)}</div>;
}

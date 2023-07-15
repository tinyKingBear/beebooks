export interface Book {
  _id: string;
  author: string;
  name: string;
  published_year: string;
  users: [User]
}
export interface User {
  _id: string;
  email: string;
  name: string;
}

export interface NewBook {
  author: string;
  name: string;
  publishedYear: string;
}

export enum HeaderState {
  NotLogin,
  MyFavorite,
  Dashboard,
}

// 请求服务器url
export const requestBaseURL = 'https://i1beebooks.yousico.com'


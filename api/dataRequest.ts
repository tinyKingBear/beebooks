import { BOOK_LIST, MY_BOOK_LIST, ADD_FAVORITE_BOOK, ADD_NEW_BOOK, DELETE_FAVORITE_BOOK } from "@/const/query";
import api from "./api";
import { NewBook } from "@/const";

// 书籍列表
export async function fetchBooks(take: number, skip: number, filter: any) {
  try {
    const response = await api.post('/graphql', {
      query: BOOK_LIST,
      variables: {
        take,
        skip,
        filter,
      },
    });
    return response.data.books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}

// 我的喜欢书列表
export async function fetchMyBooks(take: number, skip: number, filter: any) {
  try {
    const response = await api.post('/graphql', {
      query: MY_BOOK_LIST,
      variables: {
        take,
        skip,
        filter,
      },
    });
    return response.data.myBooks;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}

// 添加喜欢
export async function addFavorite(ids: string[]) {
  try {
    const response = await api.post('/graphql', {
      query: ADD_FAVORITE_BOOK,
      variables: {
        bookIds: ids
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}
// 创建一本书
export async function addNewBook(book: NewBook) {
  try {
    const response = await api.post('/graphql', {
      query: ADD_NEW_BOOK,
      variables: {
        name: book.name,
        author: book.author,
        publishedYear: book.publishedYear
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}

// 删除喜欢的书
export async function deleteFavorite(bookId: string) {
  try {
    const response = await api.post('/graphql', {
      query: DELETE_FAVORITE_BOOK,
      variables: {
        bookId: bookId
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
} 
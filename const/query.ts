// 书籍列表
export const BOOK_LIST = `
query BookList($take: Int!, $skip: Int!, $filter: BooksFilter) {
  books(take: $take, skip: $skip, filter: $filter) {
    items {
      _id
      author
      name
      published_year
      users {
        _id
        email
        name
      }
    }
    totalCount
  }
}
`
// 我喜欢的书籍
export const MY_BOOK_LIST = `
query MyBooks($take: Int!, $skip: Int!, $filter: BooksFilter) {
  myBooks(take: $take, skip: $skip, filter: $filter) {
    items {
      _id
      author
      published_year
      name
      users {
        _id
        email
        name
      }
    }
    totalCount
  }
}`
// 添加喜欢 
export const ADD_FAVORITE_BOOK = `
mutation AddLikeBooks($bookIds: [ObjectID!]!) {
  addLikeBooks(book_ids: $bookIds) {
    _id
    author
    name
    published_year
    users {
      _id
      email
      name
    }
  }
}
`
// 添加新书
export const ADD_NEW_BOOK = `
mutation NewBook($name: String, $author: String, $publishedYear: String) {
  newBook(name: $name, author: $author, published_year: $publishedYear) {
    _id
    author
    name
    published_year
    users {
      _id
      email
      name
    }
  }
}`

// 删除喜欢
export const DELETE_FAVORITE_BOOK = `
mutation DeleteLikeBooks($bookId: ObjectID!) {
  deleteLikeBooks(book_id: $bookId) {
    _id
    author
    name
    published_year
    users {
      _id
      email
      name
    }
  }
}`
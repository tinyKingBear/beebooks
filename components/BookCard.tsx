import { Book, HeaderState } from "@/const";
import React from "react";
interface BookProps {
  book: Book;
  state: HeaderState;
  handleDetail: (book: Book) => void;
  handleDelete: (book: Book) => void;
}

const BookCard: React.FC<BookProps> = ({
  book,
  state,
  handleDetail,
  handleDelete,
}) => {
  const { author, name, published_year } = book;
  const delClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleDelete(book);
  };
  return (
    <div className="bookCard" onClick={() => handleDetail(book)}>
      <p>书名: {name}</p>
      <p>作者: {author}</p>
      <p>发布年份: {published_year}</p>
      {state === HeaderState.MyFavorite && (
        <button className="delButton" onClick={delClick}>
          删除
        </button>
      )}
    </div>
  );
};

export default BookCard;

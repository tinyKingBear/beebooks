import React from "react";
import styles from "@/styles/bookInfo.module.css";
import { Book } from "@/const";
interface BookInfoProps {
  book: Book;
}

const BookInfo: React.FC<BookInfoProps> = ({ book }) => {
  const { author, name, published_year, users } = book;
  return (
    <div className={styles.infoContainer}>
      <div className={styles.bookInfo}>
        <p>书名: {name}</p>
        <p>作者: {author}</p>
        <p>发布年份: {published_year}</p>
      </div>
      <div className={styles.favoriteUsers}>
        <div>其他喜欢的人</div>
        <div className={styles.userList}>
          {users.map((user) => (
            <div key={user._id} className={styles.userContent}>
              <img
                className={styles.profile}
                src="/images/profile.png"
                alt=""
              />
              <div className={styles.name}>{user.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookInfo;

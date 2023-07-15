import React, { useEffect, useState } from "react";
import styles from "@/styles/newBook.module.css";
import { NewBook } from "@/const";

interface NewBookProps {
  handleNewBook: (book: NewBook) => void;
}
const NewBook: React.FC<NewBookProps> = ({ handleNewBook }) => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    author: "",
    year: "",
  });

  const submit = () => {
    let newErrors = {
      name: "",
      author: "",
      year: "",
    };
    if (!name) {
      newErrors.name = "书名不能为空";
    }
    if (!author) {
      newErrors.author = "作者不能为空";
    }
    if (!year) {
      newErrors.year = "书名不能为空";
    }
    setErrors(newErrors);
    if (newErrors.name || newErrors.author || newErrors.year) {
      return;
    }
    const book: NewBook = {
      name,
      author,
      publishedYear: year,
    };

    handleNewBook(book);
  };

  return (
    <div>
      <div className={styles.modalTitle}>添加书籍</div>
      <div className={styles.rowTitle}>名字</div>
      <div className={styles.rowInput}>
        <input
          className={styles.inputContent}
          value={name}
          type="text"
          placeholder="书名"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {errors.name && <div className={styles.error}>{errors.name}</div>}
      <div className={styles.rowTitle}>作者</div>
      <div className={styles.rowInput}>
        <input
          className={styles.inputContent}
          value={author}
          type="text"
          placeholder="作者"
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      {errors.author && <div className={styles.error}>{errors.author}</div>}
      <div className={styles.rowTitle}>发布年份</div>
      <div className={styles.rowInput}>
        <input
          className={styles.inputContent}
          value={year}
          type="text"
          placeholder="发布年份"
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      {errors.year && <div className={styles.error}>{errors.year}</div>}
      <div className={styles.newButton} onClick={submit}>
        新 增
      </div>
    </div>
  );
};
export default NewBook;

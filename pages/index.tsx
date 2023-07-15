import { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";
import Header from "@/components/Header";
import { Book, HeaderState, NewBook } from "@/const";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";
import {
  fetchBooks,
  fetchMyBooks,
  addFavorite,
  addNewBook,
  deleteFavorite,
} from "@/api/dataRequest";
import Modal from "@/components/Modal";
import DropdownSelect from "@/components/Select";
import BookInfo from "@/components/BookInfo";
import NewBookComponent from "@/components/NewBook";
import { useMessage } from "@/components/Message";

export default function Home() {
  const [bookList, setBookList] = useState<Book[]>([]); // 书籍列表
  const [currentPage, setCurrentPage] = useState(0); // 当前页码
  const [totalPages, setTotalPages] = useState(0); // 总页数
  const [isFavModalOpen, setIsFavModalOpen] = useState(false); // 添加喜欢弹出Modal
  const [favoriteList, setFavoriteList] = useState<Book[]>([]); // 添加喜欢时可供选择的书单
  const [selectedBook, setSelectedBook] = useState<Book>(); // 添加喜欢中选中的书
  const [isShowInfo, setIsShowInfo] = useState(false); // 查看书详情Modal
  const [bookInfo, setBookInfo] = useState<Book>(); // 点击选中的书的详情
  const [isAddBook, setIsAddBook] = useState(false); // 新增一本书Modal
  const [pageState, setPageState] = useState(HeaderState.NotLogin); // 页面所处哪个状态

  const maxVisiblePages = 5; // 最大可见页数为 5
  const pageSize = 8; // 页容量

  const router = useRouter();
  const { showMessage } = useMessage();

  useEffect(() => {
    if (
      pageState === HeaderState.NotLogin ||
      pageState === HeaderState.Dashboard
    ) {
      getBookList();
    } else if (pageState === HeaderState.MyFavorite) {
      getMyBookList();
    }
  }, [currentPage]);

  // 分页回调
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  // 提示信息
  const showTip = (content: string, type: string = "info") => {
    showMessage({
      type: "info",
      content: content,
    });
  };

  // 请求看板书单
  const getBookList = (name?: string) => {
    fetchBooks(pageSize, currentPage * pageSize, { book_name: name }).then(
      (books) => {
        setBookList(books.items);
        setTotalPages(Math.ceil(books.totalCount / pageSize));
      }
    );
  };

  // 请求搜索书单
  const handleSearchBook = (name?: string, state?: HeaderState) => {
    if (state === HeaderState.NotLogin || state === HeaderState.Dashboard) {
      getBookList(name);
    } else if (state === HeaderState.MyFavorite) {
      getMyBookList(name);
    }
    setCurrentPage(0);
  };

  // 请求我喜欢的书单
  const getMyBookList = (name?: string) => {
    fetchMyBooks(pageSize, currentPage * pageSize, { book_name: name }).then(
      (myBooks) => {
        setBookList(myBooks?.items ? myBooks.items : []);
        setTotalPages(
          Math.ceil(myBooks?.totalCount ? myBooks.totalCount / pageSize : 1)
        );
      }
    );
  };

  // 创建一本书
  const createNewBook = async (book: NewBook) => {
    await addNewBook(book);
    getMyBookList();
    closeModal();
  };

  // 点击我的书籍
  const handleMyFavorite = () => {
    setPageState(HeaderState.MyFavorite);
    setCurrentPage(0);
    getMyBookList();
  };

  const handleLogOut = () => {
    setPageState(HeaderState.NotLogin);
    setCurrentPage(0);
    getBookList();
  };

  // 点击看板按钮
  const handleDashboard = () => {
    setPageState(HeaderState.Dashboard);
    setCurrentPage(0);
    getBookList();
  };

  // 点击弹出添加喜欢Modal
  const handleAddFavorite = () => {
    setIsFavModalOpen(true);
    getFavoriteList();
  };

  // 请求所有可添加喜欢的书单
  const getFavoriteList = (name?: string) => {
    fetchBooks(1000, 0, { book_name: name }).then((books) => {
      setFavoriteList(books.items);
    });
  };
  // 关闭Modal
  const closeModal = () => {
    setIsFavModalOpen(false);
    setIsShowInfo(false);
    setIsAddBook(false);
  };

  // 添加喜欢选中回调
  const handleSelect = (selectedOption: Book) => {
    setSelectedBook(selectedOption);
  };
  // 处理登录
  const handleLogin = () => {
    router.push("/login");
  };
  // 书籍添加
  const handleAdd = () => {
    setIsAddBook(true);
    setIsFavModalOpen(false);
  };

  // 添加一本书到我喜欢
  const addFavoriteBook = async () => {
    if (!selectedBook) {
      return;
    }
    await addFavorite([selectedBook._id]);
    showTip(`${selectedBook.name}添加成功`);
    setIsFavModalOpen(false);
    getMyBookList();
  };

  // 点击书籍详情
  const showBookInfo = (book: Book) => {
    setIsShowInfo(true);
    setBookInfo(book);
  };

  // 添加新书
  const handleNewBook = async (book: NewBook) => {
    await createNewBook(book);
    showTip(`${book.name}新增成功`);
  };

  // 删除喜欢
  const handleDeleteFavorite = async (book: Book) => {
    console.log("handleDeleteFavorite", book);
    await deleteFavorite(book._id);
    showTip(`${book.name}从喜欢中移除`);
    setCurrentPage(0);
    getMyBookList();
  };

  return (
    <div className="homeContainer">
      {/* 导航 */}
      <Header
        handleLogin={handleLogin}
        handleSearch={handleSearchBook}
        handleMyFavorite={handleMyFavorite}
        handleLogOut={handleLogOut}
        handleDashboard={handleDashboard}
        handleAdd={handleAddFavorite}
      />
      {/* 书籍列表 */}
      <div className="bookListContainer">
        {bookList.length > 0 ? (
          bookList.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              state={pageState}
              handleDetail={showBookInfo}
              handleDelete={handleDeleteFavorite}
            />
          ))
        ) : (
          <span>暂无数据</span>
        )}
      </div>
      {/* 分页 */}
      <div className="footerContainer">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisiblePages={maxVisiblePages}
        />
      </div>
      {/* 添加喜欢弹出框 */}
      {isFavModalOpen && (
        <Modal onClose={closeModal}>
          <div className="selectContainer">
            <div className="title">添加喜欢的书</div>
            <div className="bookName">书名</div>
            <DropdownSelect
              options={favoriteList}
              onSelect={handleSelect}
              onAdd={handleAdd}
            />
            <div className="addButton" onClick={addFavoriteBook}>
              添加
            </div>
          </div>
        </Modal>
      )}
      {/* 显示书籍详情 */}
      {isShowInfo && (
        <Modal onClose={closeModal}>
          <BookInfo book={bookInfo!} />
        </Modal>
      )}
      {isAddBook && (
        <Modal onClose={closeModal}>
          <NewBookComponent handleNewBook={handleNewBook} />
        </Modal>
      )}
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Dropdown from "./Dropdown";
import { HeaderState } from "@/const";

type HeaderProps = {
  handleLogin: () => void;
  handleSearch: (params?: string, state?: HeaderState) => void;
  handleMyFavorite: () => void;
  handleLogOut: () => void;
  handleDashboard: () => void;
  handleAdd: () => void;
};

const Header: React.FC<HeaderProps> = ({
  handleLogin,
  handleSearch,
  handleMyFavorite,
  handleLogOut,
  handleDashboard,
  handleAdd,
}) => {
  const [headerState, setHeaderState] = useState<HeaderState>(
    HeaderState.NotLogin
  );

  const [searchValue, setSearchValue] = useState("");

  const options = ["我的书籍", "退出登录"];

  useEffect(() => {
    const isLogin = Cookies.get("token") ? true : false;
    if (isLogin) {
      setHeaderState(HeaderState.Dashboard);
    }
  }, []);

  const handleSelectOption = (option: string) => {
    if (option === "我的书籍") {
      setHeaderState(HeaderState.MyFavorite);
      handleMyFavorite();
    } else {
      setHeaderState(HeaderState.NotLogin);
      Cookies.remove("token");
      handleLogOut();
    }
  };
  // 点击看板
  const dashboardClick = () => {
    setHeaderState(HeaderState.Dashboard);
    handleDashboard();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(searchValue, headerState);
    }
  };
  return (
    <div className="headerContainer">
      {headerState === HeaderState.NotLogin && (
        <div className="endContainer">
          <div className="inputContent">
            <input
              type="text"
              placeholder="搜索书名。。。"
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div
            className="navButton loginButton"
            onClick={handleLogin}
            onKeyDown={handleKeyPress}
          >
            登 录
          </div>
        </div>
      )}
      {headerState === HeaderState.MyFavorite && (
        <>
          <div className="inputContent">
            <input
              type="text"
              placeholder="搜索书名。。。"
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="navButton" onClick={handleAdd}>
            添加喜欢
          </div>
          <div className="navButton" onClick={dashboardClick}>
            看 板
          </div>
          <div className="profileContent">
            <Dropdown options={options} onSelect={handleSelectOption} />
          </div>
        </>
      )}
      {headerState === HeaderState.Dashboard && (
        <>
          <div className="inputContent">
            <input
              type="text"
              placeholder="搜索书名。。。"
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="profileContent">
            <Dropdown options={options} onSelect={handleSelectOption} />
          </div>
        </>
      )}
    </div>
  );
};
export default Header;

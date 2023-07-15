import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages: number;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= maxVisiblePages) {
      // 如果总页数小于等于最大可见页数，则显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 否则，根据当前页码和最大可见页数计算页码范围
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);
      const startPage = Math.max(1, currentPage - halfVisiblePages);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        // 如果起始页码大于 1，则在页码列表前添加省略号
        pageNumbers.push(1, "...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        // 如果结束页码小于总页数，则在页码列表后添加省略号和最后一页码
        pageNumbers.push("...", totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div>
      {/* {currentPage > 1 && (
        <button onClick={() => handlePageChange(currentPage - 1)}>
          上一页
        </button>
      )} */}
      {getPageNumbers().map((pageNumber, index) => (
        <button
          key={index}
          onClick={() =>
            handlePageChange(
              typeof pageNumber === "number" ? pageNumber : currentPage
            )
          }
          disabled={typeof pageNumber !== "number"}
        >
          {pageNumber}
        </button>
      ))}
      {/* {currentPage < totalPages && (
        <button onClick={() => handlePageChange(currentPage + 1)}>
          下一页
        </button>
      )} */}
    </div>
  );
};

export default Pagination;

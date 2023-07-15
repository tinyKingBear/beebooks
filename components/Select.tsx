import React, { useEffect, useState } from "react";
import styles from "@/styles/select.module.css";
import { Book } from "@/const";

interface DropdownSelectProps {
  options: Book[];
  onSelect: (selectedOption: Book) => void;
  onAdd: () => void;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  options,
  onSelect,
  onAdd,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Book>();

  const handleOptionClick = (option: Book) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdownSelect}>
      <div className={styles.selectedOption} onClick={toggleDropdown}>
        {selectedOption?.name || "点击下拉选择书籍"}
      </div>
      {isOpen && (
        <>
          <div className={styles.options}>
            {options.map((option) => (
              <div
                key={option._id}
                className={styles.option}
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </div>
            ))}
          </div>
          <button className={styles.buttonOption} onClick={onAdd}>
            点击新增书籍
          </button>
        </>
      )}
    </div>
  );
};

export default DropdownSelect;

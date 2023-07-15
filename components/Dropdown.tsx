import React, { useEffect, useRef, useState } from "react";

interface CustomDropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectOption = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`custom-dropdown ${isOpen ? "open" : ""}`}
      ref={dropdownRef}
    >
      <img
        className="profile"
        src="/images/profile.png"
        alt=""
        onClick={() => setIsOpen(!isOpen)}
      />
      <ul>
        {options.map((option) => (
          <li key={option} onClick={() => handleSelectOption(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomDropdown;

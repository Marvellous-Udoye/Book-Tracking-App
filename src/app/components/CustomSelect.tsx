import { Dispatch, SetStateAction, useState } from 'react';

interface selectProps {
  selected: string
  setSelected: Dispatch<SetStateAction<"Reading" | "To-read" | "Completed">>;
}

const CustomSelect = ({ selected, setSelected }: selectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "To-read", label: "To Read" },
    { value: "Reading", label: "Reading" },
    { value: "Completed", label: "Completed" },
  ];

  const handleSelect = (value: "Reading" | "To-read" | "Completed") => {
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block font-bold text-gray-700 text-sm sm:text-base">Status</label>

      {/* Custom Dropdown */}
      <div
        className="border border-[#D9D9D9] rounded-lg p-2 sm:p-3 w-full flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='text-sm sm:text-base'>{options.find(option => option.value === selected)?.label}</span>
        <span className="absolute right-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M7 10l5 5 5-5H7z" />
          </svg>

        </span>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute border rounded-lg bg-white mt-1 w-full z-10 border-blue-600">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value as "Reading" | "To-read" | "Completed")}
              className="p-2 hover:bg-blue-100 cursor-pointer text-sm sm:text-base"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;

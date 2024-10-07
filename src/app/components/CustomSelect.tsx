import { useState } from 'react';

const CustomSelect = () => {
  const [selectedValue, setSelectedValue] = useState("to-read");
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "to-read", label: "To Read" },
    { value: "reading", label: "Reading" },
    { value: "completed", label: "Completed" },
  ];

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block font-bold text-gray-700">Status</label>

      {/* Custom Dropdown */}
      <div
        className="border border-[#D9D9D9] rounded-lg p-3 w-full flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{options.find(option => option.value === selectedValue)?.label}</span>
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
              onClick={() => handleSelect(option.value)}
              className="p-2 hover:bg-blue-100 cursor-pointer"
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

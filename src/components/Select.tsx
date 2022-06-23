import React from "react";

export const Select: React.FC<{
  selected: string;
  options: string[];
  onSelect: (v: string) => void;
}> = ({ options, selected, onSelect }) => {
  return (
    <select
      id="large"
      value={selected}
      className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={(e) => {
        const { selectedIndex } = e.target.options;
        onSelect(options[selectedIndex]);
      }}
    >
      {options.map((opt) => (
        <option value={opt} key={opt} data-value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

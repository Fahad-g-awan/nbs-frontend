import React from "react";

const sections = [
  "Products",
  "Main Category",
  "Space Association Category",
  "Material Categories",
  "Additional Features",
  "Style Categories",
];

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <div className="w-full bg-gray-800 text-white h-screen p-4">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
      <ul>
        {sections.map((section) => (
          <li
            key={section}
            onClick={() => setActiveSection(section)}
            className={`p-2 cursor-pointer rounded ${
              activeSection === section ? "bg-gray-600" : ""
            }`}
          >
            {section}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

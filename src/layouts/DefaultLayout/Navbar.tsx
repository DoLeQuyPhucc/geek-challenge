import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-9 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo - removed to avoid conflict with mobile burger menu */}
        <div className="flex items-center">
          <div className="flex-shrink-0">{/* Title moved to Sidebar */}</div>
        </div>

        {/* Responsive spacing */}
        <div className="flex items-center space-x-4">
          {/* Có thể thêm các elements khác ở đây nếu cần */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

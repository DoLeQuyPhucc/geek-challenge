"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Album, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Albums",
      icon: Album,
      href: "/album",
    },
    {
      name: "Users",
      icon: Users,
      href: "/user",
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white p-2 rounded-md shadow-lg hover:bg-gray-50 transition-colors"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-50 border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0 lg:h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-4 lg:p-6 pt-16 lg:pt-6 bg-white">
            <img
              src="https://geekup.vn/Icons/geekup-logo-general.svg"
              alt="GeekUp Logo"
              className="h-7 w-auto"
              style={{ aspectRatio: "15/4" }}
            />
          </div>

          {/* Menu items */}
          <nav className="flex-1 px-4 lg:px-6 py-4 bg-white">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? "bg-blue-500 text-white shadow-sm"
                          : "text-gray-700 hover:bg-blue-500 hover:text-white hover:shadow-sm"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <IconComponent
                        className={`h-5 w-5 mr-3 ${
                          isActive
                            ? "text-white"
                            : "text-gray-500 group-hover:text-white"
                        }`}
                      />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

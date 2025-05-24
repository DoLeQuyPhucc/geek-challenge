"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserTable from "@/components/Users/UserTable";
import Navbar from "@/layouts/DefaultLayout/Navbar";
import Sidebar from "@/layouts/DefaultLayout/Sidebar";
import { getUsers } from "@/services/UserService";

interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  username: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company?: {
    name: string;
  };
}

function UserPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Fetch all 10 users
        const data = await getUsers({ _start: 0, _end: 10 });
        setUsers(data);
      } catch (err) {
        setError("Không thể tải dữ liệu người dùng. Vui lòng thử lại sau.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleViewDetail = (userId: number) => {
    router.push(`/user/${userId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 p-6 lg:p-8">
              <div className="bg-white rounded-lg shadow-sm p-6 min-h-[calc(100vh-8rem)]">
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  <span className="ml-3 text-gray-600">Loading...</span>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 p-6 lg:p-8">
              <div className="bg-white rounded-lg shadow-sm p-6 min-h-[calc(100vh-8rem)]">
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="text-red-500 text-lg font-medium mb-2">
                      Lỗi
                    </div>
                    <div className="text-gray-600">{error}</div>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Thử lại
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6 lg:p-8">
            <div className="bg-white rounded-lg shadow-sm p-6 min-h-[calc(100vh-8rem)]">
              <UserTable users={users} onViewDetail={handleViewDetail} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default UserPage;

import UserTable from '@/components/Users/UserTable'
import Navbar from "@/layouts/DefaultLayout/Navbar";
import Sidebar from "@/layouts/DefaultLayout/Sidebar";
import React from 'react'

function page() {
  // Sample data for demonstration
  const sampleUsers = [
    { 
      id: 1, 
      name: "Nguyễn Văn An", 
      email: "an.nguyen@example.com", 
      role: "Admin", 
      status: "active" as const, 
      createdAt: "2024-01-15" 
    },
    { 
      id: 2, 
      name: "Trần Thị Bình", 
      email: "binh.tran@example.com", 
      role: "User", 
      status: "active" as const, 
      createdAt: "2024-02-20" 
    },
    { 
      id: 3, 
      name: "Lê Văn Cường", 
      email: "cuong.le@example.com", 
      role: "Moderator", 
      status: "inactive" as const, 
      createdAt: "2024-01-10" 
    },
    { 
      id: 4, 
      name: "Phạm Thị Dung", 
      email: "dung.pham@example.com", 
      role: "User", 
      status: "active" as const, 
      createdAt: "2024-03-05" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          {/* Main content area */}
          <main className="flex-1 p-6 lg:p-8">
            <div className="bg-white rounded-lg shadow-sm p-6 min-h-[calc(100vh-8rem)]">
              <UserTable users={sampleUsers} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default page
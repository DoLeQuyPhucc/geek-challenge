"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/layouts/DefaultLayout/Navbar";
import Sidebar from "@/layouts/DefaultLayout/Sidebar";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/album");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          {/* Main content area */}
          <main className="flex-1 p-6 lg:p-8">
            <div className="bg-white rounded-lg shadow-sm p-6 min-h-[calc(100vh-8rem)]">
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Redirecting...</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

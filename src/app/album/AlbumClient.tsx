"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import AlbumTable from "@/components/Albums/AlbumTable";
import Navbar from "@/layouts/DefaultLayout/Navbar";
import Sidebar from "@/layouts/DefaultLayout/Sidebar";
import { getAlbumsWithUsers, getAlbumsCount } from "@/services/AlbumService";
import { usePagination } from "@/hooks/usePagination";

export const metadata: Metadata = {
  title: "Album",
};

interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface Album extends Record<string, unknown> {
  id: number;
  title: string;
  userId: number;
  user?: User;
}

function AlbumPageContent() {
  const router = useRouter();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { currentPage, totalPages, itemsPerPage, goToPage, changePageSize } =
    usePagination({
      totalItems: totalAlbums,
      defaultItemsPerPage: 10,
    });

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const _start = (currentPage - 1) * itemsPerPage;
        const _end = _start + itemsPerPage;

        const [data, totalCount] = await Promise.all([
          getAlbumsWithUsers({ _start, _end }),
          totalAlbums === 0 ? getAlbumsCount() : Promise.resolve(totalAlbums),
        ]);

        setAlbums(data);
        if (totalAlbums === 0) {
          setTotalAlbums(totalCount);
        }
      } catch (err) {
        setError("Không thể tải dữ liệu album. Vui lòng thử lại sau.");
        console.error("Error fetching albums:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [currentPage, itemsPerPage, totalAlbums]);

  const handleViewDetail = (albumId: number) => {
    router.push(`/album/${albumId}`);
  };

  const handleUserClick = (userId: number) => {
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
                      Error
                    </div>
                    <div className="text-gray-600">{error}</div>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Try again
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
              <AlbumTable
                albums={albums}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalAlbums}
                onViewDetail={handleViewDetail}
                onPageSizeChange={changePageSize}
                onUserClick={handleUserClick}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function AlbumPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <AlbumPageContent />
    </Suspense>
  );
}

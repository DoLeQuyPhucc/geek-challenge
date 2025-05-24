'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import AlbumTable from '@/components/Albums/AlbumTable';
import Navbar from "@/layouts/DefaultLayout/Navbar";
import Sidebar from "@/layouts/DefaultLayout/Sidebar";
import { getAlbumsWithUsers } from '@/services/AlbumService';
import { usePagination } from '@/hooks/usePagination';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface Album {
  id: number;
  title: string;
  userId: number;
  user?: User;
}

function AlbumPageContent() {
  const router = useRouter();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    currentPage,
    totalPages,
    itemsPerPage,
    goToPage,
    changePageSize,
    getPaginatedData
  } = usePagination({
    totalItems: albums.length,
    defaultItemsPerPage: 10
  });

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const data = await getAlbumsWithUsers();
        setAlbums(data);
      } catch (err) {
        setError('Không thể tải dữ liệu album. Vui lòng thử lại sau.');
        console.error('Error fetching albums:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const handleViewDetail = (albumId: number) => {
    router.push(`/album/${albumId}`);
  };

  const paginatedAlbums = getPaginatedData(albums);

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
                  <span className="ml-3 text-gray-600">Đang tải dữ liệu...</span>
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
                    <div className="text-red-500 text-lg font-medium mb-2">Lỗi</div>
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
              <AlbumTable 
                albums={paginatedAlbums}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                itemsPerPage={itemsPerPage}
                totalItems={albums.length}
                onViewDetail={handleViewDetail}
                onPageSizeChange={changePageSize}
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
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    }>
      <AlbumPageContent />
    </Suspense>
  );
}
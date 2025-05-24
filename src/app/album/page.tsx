import AlbumTable from '@/components/Albums/AlbumTable'
import Navbar from "@/layouts/DefaultLayout/Navbar";
import Sidebar from "@/layouts/DefaultLayout/Sidebar";
import React from 'react'

function page() {
  // Sample data for demonstration
  const sampleAlbums = [
    { id: 1, title: "Abbey Road", artist: "The Beatles", year: 1969 },
    { id: 2, title: "Dark Side of the Moon", artist: "Pink Floyd", year: 1973 },
    { id: 3, title: "Thriller", artist: "Michael Jackson", year: 1982 },
    { id: 4, title: "Back in Black", artist: "AC/DC", year: 1980 },
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
              <AlbumTable albums={sampleAlbums} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default page
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Mail,
  ChevronRight as BreadcrumbChevron,
} from "lucide-react";
import Navbar from "@/layouts/DefaultLayout/Navbar";
import Sidebar from "@/layouts/DefaultLayout/Sidebar";
import { albumService, userService } from "@/api/axiosInstance";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}

interface Album {
  id: number;
  title: string;
  userId: number;
  user?: User;
}

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: number;
}

export default function AlbumDetailPage() {
  const params = useParams();
  const router = useRouter();
  const albumId = params.id as string;

  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [photosPerPage] = useState(12);
  const [currentPhotoPage, setCurrentPhotoPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPhotoPages = Math.ceil(totalPhotos / photosPerPage);

  // Function to replace placeholder URLs with dummyjson URLs
  const getValidImageUrl = (url: string, fallbackId?: number): string => {
    if (url.includes("via.placeholder.com")) {
      const id = fallbackId || Math.floor(Math.random() * 1000) + 1;
      return `https://dummyjson.com/image/400x300?text=Photo+${id}`;
    }
    return url;
  };

  // Handle image error and replace with fallback
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    photo: Photo
  ) => {
    const target = e.target as HTMLImageElement;
    if (!target.src.includes("dummyjson.com")) {
      target.src = getValidImageUrl(photo.url, photo.id);
    }
  };

  // Open photo modal
  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  // Close photo modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  // Open photo URL in new tab
  const openPhotoUrl = (url: string) => {
    const validUrl = getValidImageUrl(url);
    window.open(validUrl, "_blank");
  };

  // Navigate to user detail page
  const handleUserClick = () => {
    if (album?.user?.id) {
      router.push(`/user/${album.user.id}`);
    }
  };

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        setLoading(true);

        // Fetch album and user data
        const albumResponse = await albumService.get(`/albums/${albumId}`);
        const albumData = albumResponse.data;

        // Fetch user data
        const userResponse = await userService.get(
          `/users/${albumData.userId}`
        );
        const userData = userResponse.data;

        setAlbum({ ...albumData, user: userData });

        // Get total photos count first
        const allPhotosResponse = await albumService.get(
          `/photos?albumId=${albumId}`
        );
        setTotalPhotos(allPhotosResponse.data.length);
      } catch (err) {
        setError("Không thể tải chi tiết album. Vui lòng thử lại sau.");
        console.error("Error fetching album details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (albumId) {
      fetchAlbumDetails();
    }
  }, [albumId]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const start = (currentPhotoPage - 1) * photosPerPage;
        const end = start + photosPerPage;

        const photosResponse = await albumService.get(
          `/photos?_start=${start}&_end=${end}&albumId=${albumId}`
        );

        setPhotos(photosResponse.data);
      } catch (err) {
        console.error("Error fetching photos:", err);
      }
    };

    if (albumId && totalPhotos > 0) {
      fetchPhotos();
    }
  }, [albumId, currentPhotoPage, photosPerPage, totalPhotos]);

  const generateAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random&color=fff&size=64`;
  };

  const handlePhotoPageChange = (page: number) => {
    setCurrentPhotoPage(Math.max(1, Math.min(page, totalPhotoPages)));
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
                  <span className="ml-3 text-gray-600">Album Loading...</span>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (error || !album) {
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
                    <div className="text-gray-600">
                      {error || "Album không tồn tại"}
                    </div>
                    <button
                      onClick={() => router.push("/album")}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Back to List
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
              {/* Header */}
              <div className="flex items-center mb-6">
                <button
                  onClick={() => router.back()}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
                >
                  <ArrowLeft className="h-5 w-5 mr-1" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Show Album</h1>
              </div>

              {/* Breadcrumbs */}
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                <button
                  onClick={() => router.push("/album")}
                  className="hover:text-blue-600 transition-colors"
                >
                  Album
                </button>
                <BreadcrumbChevron className="h-4 w-4" />
                <span className="text-gray-900 font-medium">Show</span>
              </div>

              {/* Album Info */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex items-start space-x-6">
                  <div
                    className="flex-shrink-0 cursor-pointer"
                    onClick={handleUserClick}
                    title={`View user ${album.user?.name || "Unknown"}`}
                  >
                    <img
                      src={generateAvatarUrl(album.user?.name || "Unknown")}
                      alt={album.user?.name || "Unknown"}
                      className="h-16 w-16 rounded-full hover:ring-2 hover:ring-blue-500 transition-all"
                    />
                  </div>
                  <div className="flex-1">
                    <h2
                      className="text-xl font-semibold text-blue-600 hover:text-blue-800 mb-2 cursor-pointer transition-colors"
                      onClick={handleUserClick}
                      title={`View user ${album.user?.name || "Unknown"}`}
                    >
                      {album.user?.name}
                    </h2>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        <span className="font-medium">Email:</span>
                        <a
                          href={`mailto:${album.user?.email}`}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          {album.user?.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photos Grid */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Photos in Album
                  </h3>
                  <span className="text-sm text-gray-500">
                    Page {currentPhotoPage} / {totalPhotoPages} ({totalPhotos}{" "}
                    photos)
                  </span>
                </div>

                {photos.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                      {photos.map((photo) => (
                        <div
                          key={photo.id}
                          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => handlePhotoClick(photo)}
                        >
                          <img
                            src={getValidImageUrl(photo.thumbnailUrl, photo.id)}
                            alt={photo.title}
                            className="w-full h-40 object-cover"
                            onError={(e) => handleImageError(e, photo)}
                          />
                          <div className="p-3">
                            <h4
                              className="text-sm font-medium text-gray-900 truncate"
                              title={photo.title}
                            >
                              {photo.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              ID: {photo.id}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Photo Pagination */}
                    {totalPhotoPages > 1 && (
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() =>
                            handlePhotoPageChange(currentPhotoPage - 1)
                          }
                          disabled={currentPhotoPage === 1}
                          className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Previous
                        </button>

                        <div className="flex space-x-1">
                          {Array.from(
                            { length: Math.min(5, totalPhotoPages) },
                            (_, i) => {
                              const page = i + 1;
                              return (
                                <button
                                  key={page}
                                  onClick={() => handlePhotoPageChange(page)}
                                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                                    currentPhotoPage === page
                                      ? "bg-blue-50 border-blue-500 text-blue-600 border"
                                      : "text-gray-500 hover:bg-gray-50 border border-gray-300"
                                  }`}
                                >
                                  {page}
                                </button>
                              );
                            }
                          )}
                        </div>

                        <button
                          onClick={() =>
                            handlePhotoPageChange(currentPhotoPage + 1)
                          }
                          disabled={currentPhotoPage === totalPhotoPages}
                          className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>This album has no photos</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Photo Modal */}
      {isModalOpen && selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-4xl max-h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {selectedPhoto.title}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openPhotoUrl(selectedPhoto.url)}
                  className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open URL
                </button>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  title="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              <img
                src={getValidImageUrl(selectedPhoto.url, selectedPhoto.id)}
                alt={selectedPhoto.title}
                className="w-full h-auto max-h-[70vh] object-contain cursor-pointer"
                onClick={() => openPhotoUrl(selectedPhoto.url)}
                onError={(e) => handleImageError(e, selectedPhoto)}
              />
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <strong>Photo ID:</strong> {selectedPhoto.id}
                </p>
                <p>
                  <strong>Album ID:</strong> {selectedPhoto.albumId}
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  Click the image or "Open URL" to view in full size
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

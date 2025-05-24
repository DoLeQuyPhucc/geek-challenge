"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building,
  Album as AlbumIcon,
  Eye,
  ChevronRight as BreadcrumbChevron,
} from "lucide-react";
import Navbar from "@/layouts/DefaultLayout/Navbar";
import Sidebar from "@/layouts/DefaultLayout/Sidebar";
import { getUserById, getUserAlbums } from "@/services/UserService";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  username: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

interface Album {
  id: number;
  title: string;
  userId: number;
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);

        // Fetch user data and their albums
        const [userData, albumsData] = await Promise.all([
          getUserById(userId),
          getUserAlbums(userId, { _start: 0, _end: 10 }),
        ]);

        setUser(userData);
        setAlbums(albumsData);
      } catch (err) {
        setError("Không thể tải chi tiết người dùng. Vui lòng thử lại sau.");
        console.error("Error fetching user details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const generateAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random&color=fff&size=128`;
  };

  const handleViewAlbum = (albumId: number) => {
    router.push(`/album/${albumId}`);
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
                  <span className="ml-3 text-gray-600">User Loading...</span>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
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
                      {error || "User not found"}
                    </div>
                    <button
                      onClick={() => router.push("/user")}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Back to User List
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
                <h1 className="text-2xl font-bold text-gray-900">Show User</h1>
              </div>

              {/* Breadcrumbs */}
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                <button
                  onClick={() => router.push("/user")}
                  className="hover:text-blue-600 transition-colors"
                >
                  User
                </button>
                <BreadcrumbChevron className="h-4 w-4" />
                <span className="text-gray-900 font-medium">Show</span>
              </div>

              {/* User Info */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <img
                      src={generateAvatarUrl(user.name)}
                      alt={user.name}
                      className="h-24 w-24 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      {user.name}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          <span className="font-medium">Email:</span>
                          <a
                            href={`mailto:${user.email}`}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            {user.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Albums */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    User Albums
                  </h3>
                  <span className="text-sm text-gray-500">
                    {albums.length} albums
                  </span>
                </div>

                {albums.length > 0 ? (
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {albums.map((album) => (
                          <tr key={album.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {album.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {album.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleViewAlbum(album.id)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                title="View album detail"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Show
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <AlbumIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>This user has no albums</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

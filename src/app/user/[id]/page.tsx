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
                  onClick={() => router.push("/user")}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
                >
                  <ArrowLeft className="h-5 w-5 mr-1" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Show User</h1>
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
                          <User className="h-4 w-4 mr-2" />
                          <span className="font-medium">Username:</span>
                          <span className="ml-2">@{user.username}</span>
                        </div>
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
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          <span className="font-medium">Phone:</span>
                          <span className="ml-2">{user.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Globe className="h-4 w-4 mr-2" />
                          <span className="font-medium">Website:</span>
                          <a
                            href={`https://${user.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            {user.website}
                          </a>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                          <div>
                            <span className="font-medium">Address:</span>
                            <div className="ml-2 text-sm">
                              {user.address.suite} {user.address.street}
                              <br />
                              {user.address.city}, {user.address.zipcode}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Building className="h-4 w-4 mr-2" />
                          <span className="font-medium">Company:</span>
                          <span className="ml-2">{user.company.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">User ID</div>
                    <div className="text-lg font-semibold text-gray-900">
                      #{user.id}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {albums.map((album) => (
                      <div
                        key={album.id}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <AlbumIcon className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-500">
                                Album #{album.id}
                              </span>
                            </div>
                            <h4 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2">
                              {album.title}
                            </h4>
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewAlbum(album.id)}
                          className="w-full flex items-center justify-center px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors border border-blue-200"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Album
                        </button>
                      </div>
                    ))}
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

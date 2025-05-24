import React from "react";
import { Eye } from "lucide-react";
import Image from "next/image";
import TableOne, { TableColumn } from "../Table/TableOne";
import Pagination from "../ui/Pagination";

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

interface AlbumTableProps {
  albums: Album[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  onViewDetail: (albumId: number) => void;
  onPageSizeChange?: (size: number) => void;
  onUserClick?: (userId: number) => void;
}

const AlbumTable: React.FC<AlbumTableProps> = ({
  albums,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  onViewDetail,
  onPageSizeChange,
  onUserClick,
}) => {
  const generateAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random&color=fff&size=32`;
  };

  const columns: TableColumn<Album>[] = [
    {
      key: "id",
      header: "ID",
      className: "w-16",
    },
    {
      key: "title",
      header: "Album Name",
      render: (value: unknown) => (
        <span className="font-medium text-gray-900">{String(value)}</span>
      ),
    },
    {
      key: "user",
      header: "User",
      render: (user: unknown) => {
        const userData = user as User;
        return (
          <div
            className={`flex items-center ${
              onUserClick
                ? "cursor-pointer hover:bg-gray-50 rounded-md p-1 -m-1 transition-colors"
                : ""
            }`}
            onClick={() =>
              onUserClick && userData?.id && onUserClick(userData.id)
            }
            title={
              onUserClick
                ? `View user ${userData?.name || "Unknown"}`
                : undefined
            }
          >
            <Image
              src={generateAvatarUrl(userData?.name || "Unknown")}
              alt={userData?.name || "Unknown"}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full mr-3"
            />
            <div>
              <div
                className={`font-medium ${
                  onUserClick
                    ? "text-blue-600 hover:text-blue-800"
                    : "text-gray-900"
                }`}
              >
                {userData?.name || "Unknown"}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      key: "actions",
      header: "Action",
      className: "w-32",
      render: (value: unknown, row: Album) => (
        <button
          onClick={() => onViewDetail(row.id)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          title="View album detail"
        >
          <Eye className="h-4 w-4 mr-1" />
          Show
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Album List</h2>
        <span className="text-sm text-gray-500">
          Total: {totalItems} albums
        </span>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <TableOne<Album>
          columns={columns}
          data={albums}
          headerClassName="bg-blue-50"
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
};

export default AlbumTable;

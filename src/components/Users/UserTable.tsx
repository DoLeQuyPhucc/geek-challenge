import React from "react";
import { Eye } from "lucide-react";
import Image from "next/image";
import TableOne, { TableColumn } from "../Table/TableOne";

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

interface UserTableProps {
  users: User[];
  onViewDetail: (userId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onViewDetail }) => {
  const generateAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random&color=fff&size=64`;
  };

  const columns: TableColumn<User>[] = [
    {
      key: "id",
      header: "ID",
      className: "w-16",
    },
    {
      key: "avatar",
      header: "Avatar",
      className: "w-20",
      render: (value: unknown, row: User) => (
        <div className="flex items-center justify-center">
          <Image
            src={generateAvatarUrl(row.name)}
            alt={row.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
        </div>
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (value: unknown) => (
        <span className="font-medium text-gray-900">{String(value)}</span>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (value: unknown) => (
        <a
          href={`mailto:${String(value)}`}
          className="text-blue-600 hover:text-blue-800"
          title={`Send email to ${String(value)}`}
        >
          {String(value)}
        </a>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (value: unknown) => (
        <a
          href={`tel:${String(value)}`}
          className="text-blue-600 hover:text-blue-800"
          title={`Call ${String(value)}`}
        >
          {String(value)}
        </a>
      ),
    },
    {
      key: "website",
      header: "Website",
      render: (value: unknown) => (
        <a
          href={`https://${String(value)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          {String(value)}
        </a>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-32",
      render: (value: unknown, row: User) => (
        <button
          onClick={() => onViewDetail(row.id)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          title="View user detail"
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
        <h2 className="text-xl font-semibold text-gray-900">User List</h2>
        <span className="text-sm text-gray-500">
          Total: {users.length} users
        </span>
      </div>

      <TableOne<User>
        columns={columns}
        data={users}
        className="shadow-lg"
        headerClassName="bg-blue-50"
      />
    </div>
  );
};

export default UserTable;
